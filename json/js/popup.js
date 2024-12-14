// 工具函数
const utils = {
    // JSON 排序
    sortJSON(obj) {
        if (typeof obj !== 'object' || obj === null) return obj;
        
        if (Array.isArray(obj)) {
            return obj.map(item => this.sortJSON(item));
        }
        
        return Object.keys(obj)
            .sort()
            .reduce((acc, key) => {
                acc[key] = this.sortJSON(obj[key]);
                return acc;
            }, {});
    },

    // Unicode 转换
    toUnicode(str) {
        return str.replace(/[\u4e00-\u9fa5]/g, char => {
            return '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0');
        });
    },

    fromUnicode(str) {
        return str.replace(/\\u[\dA-Fa-f]{4}/g, match => {
            return String.fromCharCode(parseInt(match.slice(2), 16));
        });
    },

    // JSON 高亮
    highlightJSON(json) {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, null, 2);
        }
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
            let cls = 'json-number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'json-key';
                } else {
                    cls = 'json-string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'json-boolean';
            } else if (/null/.test(match)) {
                cls = 'json-null';
            }
            return `<span class="${cls}">${match}</span>`;
        });
    },

    // 比较两个是否相等
    isEqual(value1, value2) {
        if (typeof value1 !== typeof value2) return false;
        if (typeof value1 !== 'object' || value1 === null || value2 === null) {
            return value1 === value2;
        }
        if (Array.isArray(value1) !== Array.isArray(value2)) return false;
        
        const keys1 = Object.keys(value1);
        const keys2 = Object.keys(value2);
        if (keys1.length !== keys2.length) return false;
        
        return keys1.every(key => 
            keys2.includes(key) && this.isEqual(value1[key], value2[key])
        );
    },

    // 比对两个JSON对象并生成带有差异标记的HTML
    compareJSON(json1, json2) {
        // 先对两个JSON对象进行排序
        const sorted1 = this.sortJSON(json1, true);
        const sorted2 = this.sortJSON(json2, true);
        
        // 生成比对结果HTML
        return this.generateDiffHTML(sorted1, sorted2);
    },

    // 生成差异对比的HTML
    generateDiffHTML(obj1, obj2, path = '') {
        if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
            const isEqual = obj1 === obj2;
            const value = JSON.stringify(obj2 || obj1);
            return `<span class="${isEqual ? '' : 'diff-modified'}">${value}</span>`;
        }

        const isArray = Array.isArray(obj1);
        const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
        const lines = [];

        if (isArray) {
            lines.push('[');
        } else {
            lines.push('{');
        }

        for (const key of Array.from(keys).sort()) {
            const value1 = obj1[key];
            const value2 = obj2[key];
            const keyStr = isArray ? '' : `"${key}": `;
            
            if (!(key in obj1)) {
                // 新增的属性
                lines.push(`  ${keyStr}<span class="diff-added">${JSON.stringify(value2)}</span>`);
            } else if (!(key in obj2)) {
                // 删除的属性
                lines.push(`  ${keyStr}<span class="diff-removed">${JSON.stringify(value1)}</span>`);
            } else if (!this.isEqual(value1, value2)) {
                // 修改的属性
                if (typeof value1 === 'object' && typeof value2 === 'object' && value1 && value2) {
                    lines.push(`  ${keyStr}${this.generateDiffHTML(value1, value2, path + '.' + key)}`);
                } else {
                    lines.push(`  ${keyStr}<span class="diff-modified">${JSON.stringify(value2)}</span>`);
                }
            } else {
                // 相同的属性
                lines.push(`  ${keyStr}${JSON.stringify(value1)}`);
            }

            if (Array.from(keys).indexOf(key) < keys.size - 1) {
                lines[lines.length - 1] += ',';
            }
        }

        if (isArray) {
            lines.push(']');
        } else {
            lines.push('}');
        }

        return lines.join('\n');
    },

    // 生成带有差异标记的JSON字符串
    generateDiffMarkup(originalText, compareText) {
        try {
            // 解析 JSON
            const json1 = JSON.parse(originalText);
            const json2 = JSON.parse(compareText);
            
            // 对比较对象进行排序
            const sortedJson2 = this.sortJSON(json2, true);
            
            // 将原始文本分行
            const lines = originalText.split('\n');
            
            // 生成��对结果
            return lines.map(line => {
                // 如果是空行或只包含括号/逗号的行，直接返回
                if (!line.trim() || /^[\s\{\}\[\],]*$/.test(line)) {
                    return `<span class="diff-line">${line}</span>`;
                }

                // 检查是否是键值对行
                const keyMatch = line.match(/^(\s*)"([^"]+)":\s*(.+?)(,?)$/);
                if (keyMatch) {
                    const [, indent, key, value, comma] = keyMatch;
                    
                    // 从两个对象中获取值进行比较
                    let path = key.split('.');
                    let val1 = json1;
                    let val2 = sortedJson2;
                    
                    for (const p of path) {
                        val1 = val1?.[p];
                        val2 = val2?.[p];
                    }

                    // 如果值不相等，标记整行为修改
                    if (!this.isEqual(val1, val2)) {
                        return `<span class="diff-line"><span class="diff-modified">${line}</span></span>`;
                    }
                } else {
                    // 处理数组元素或其他值
                    try {
                        const valueOnly = line.trim().replace(/,$/, '');
                        if (valueOnly && !/^[\{\}\[\],]*$/.test(valueOnly)) {
                            const parsedValue = JSON.parse(valueOnly);
                            if (!this.isEqual(parsedValue, sortedJson2)) {
                                return `<span class="diff-line"><span class="diff-modified">${line}</span></span>`;
                            }
                        }
                    } catch (e) {
                        // 解析失败，可能是部分值，跳过
                    }
                }
                
                return `<span class="diff-line">${line}</span>`;
            }).join('\n');
        } catch (e) {
            console.error('比对错误:', e);
            return originalText.split('\n')
                .map(line => `<span class="diff-line">${line}</span>`)
                .join('\n');
        }
    }
};

// 主题配置
const themes = {
    light: {
        background: '#ffffff',
        text: '#000000',
        key: '#d63384',
        string: '#198754',
        number: '#0d6efd',
        boolean: '#dc3545',
        null: '#6c757d'
    },
    dark: {
        background: '#1e1e1e',
        text: '#d4d4d4',
        key: '#9cdcfe',
        string: '#ce9178',
        number: '#b5cea8',
        boolean: '#569cd6',
        null: '#569cd6'
    }
};

// 当前操作类型
let currentOperation = 'sort'; // 默认为排序操作

// 添加防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 执行当前操作（使用防抖）
const executeOperation = debounce(() => {
    const input = document.getElementById('formatInput');
    const resultDiv = document.getElementById('formatResult');

    try {
        let result;
        let inputValue = input.value;
        
        switch (currentOperation) {
            case 'sort':
                const obj = JSON.parse(inputValue);
                result = utils.sortJSON(obj);
                resultDiv.innerHTML = utils.highlightJSON(JSON.stringify(result, null, 2));
                break;
            
            case 'toUnicode':
                try {
                    const obj = JSON.parse(inputValue);
                    const unicodeStr = utils.toUnicode(JSON.stringify(obj));
                    result = JSON.stringify(JSON.parse(unicodeStr), null, 2);
                } catch {
                    result = utils.toUnicode(inputValue);
                }
                resultDiv.innerHTML = utils.highlightJSON(result);
                break;
            
            case 'fromUnicode':
                try {
                    const obj = JSON.parse(inputValue);
                    const normalStr = utils.fromUnicode(JSON.stringify(obj));
                    result = JSON.stringify(JSON.parse(normalStr), null, 2);
                } catch {
                    result = utils.fromUnicode(inputValue);
                }
                resultDiv.innerHTML = utils.highlightJSON(result);
                break;
        }
    } catch (e) {
        resultDiv.innerHTML = `<div class="error">错误: ${e.message}</div>`;
    }
}, 300);

// 初始化主题设置
function initThemeSettings() {
    const themeToggle = document.getElementById('themeToggle');
    const themePanel = document.querySelector('.theme-panel');
    
    // 生成主题设置面板
    Object.entries(themes.light).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'color';
        input.value = value;
        input.dataset.themeKey = key;
        input.addEventListener('change', updateTheme);
        
        const label = document.createElement('label');
        label.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ': ';
        
        const div = document.createElement('div');
        div.appendChild(label);
        div.appendChild(input);
        themePanel.appendChild(div);
    });
    
    themeToggle.addEventListener('click', () => {
        themePanel.style.display = themePanel.style.display === 'none' ? 'block' : 'none';
    });
}

// 更新主题
function updateTheme(event) {
    const key = event.target.dataset.themeKey;
    const value = event.target.value;
    document.documentElement.style.setProperty(`--${key}-color`, value);
}

// 标签页切换
function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const subTabs = document.querySelectorAll('.sub-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab + 'Tab';
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = content.id === targetId ? 'block' : 'none';
            });
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
    
    subTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            subTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentOperation = tab.dataset.subtab;
        });
    });
}

// 复制结果
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('已复制到剪贴板');
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

// 修改自动比对功能
function autoCompare() {
    const input1 = document.getElementById('compareInput1');
    const input2 = document.getElementById('compareInput2');
    const highlight1 = document.getElementById('compareHighlight1');
    const highlight2 = document.getElementById('compareHighlight2');

    try {
        // 获取输入值
        const text1 = input1.value;
        const text2 = input2.value;

        // 如果任一输入为空，清空高亮并返回
        if (!text1.trim() || !text2.trim()) {
            highlight1.innerHTML = text1;
            highlight2.innerHTML = text2;
            return;
        }

        // 解析 JSON
        const json1 = JSON.parse(text1);
        const json2 = JSON.parse(text2);

        // 格式化 JSON
        const formatted1 = JSON.stringify(json1, null, 2);
        const formatted2 = JSON.stringify(json2, null, 2);

        // 更新输入框的格式化文本
        input1.value = formatted1;
        input2.value = formatted2;

        // 对第二个对象进行排序用于比对
        const sortedJson2 = utils.sortJSON(json2, true);

        // 逐行比对
        const lines1 = formatted1.split('\n');
        const lines2 = formatted2.split('\n');

        // 生成高亮文本
        const highlightedLines1 = lines1.map(line => {
            // 尝试提取键和值
            const match = line.match(/^(\s*)"([^"]+)":\s*(.+?)(,?)$/);
            if (match) {
                const [, indent, key, value] = match;
                // 从两个对象中获取对应的值
                const path = key.split('.');
                let val1 = json1;
                let val2 = sortedJson2;
                for (const p of path) {
                    val1 = val1?.[p];
                    val2 = val2?.[p];
                }
                // 如果值不相等，高亮整行
                if (JSON.stringify(val1) !== JSON.stringify(val2)) {
                    return `<span class="diff-modified">${line}</span>`;
                }
            }
            return line;
        });

        const highlightedLines2 = lines2.map(line => {
            const match = line.match(/^(\s*)"([^"]+)":\s*(.+?)(,?)$/);
            if (match) {
                const [, indent, key, value] = match;
                const path = key.split('.');
                let val1 = json2;
                let val2 = utils.sortJSON(json1, true);
                for (const p of path) {
                    val1 = val1?.[p];
                    val2 = val2?.[p];
                }
                if (JSON.stringify(val1) !== JSON.stringify(val2)) {
                    return `<span class="diff-modified">${line}</span>`;
                }
            }
            return line;
        });

        // 更新高亮���示
        highlight1.innerHTML = highlightedLines1.join('\n');
        highlight2.innerHTML = highlightedLines2.join('\n');

        // 同步滚动位置
        syncScroll(input1, highlight1);
        syncScroll(input2, highlight2);
    } catch (e) {
        // 发生错误时显示原始文本
        console.error('比对错误:', e);
        highlight1.innerHTML = input1.value;
        highlight2.innerHTML = input2.value;
    }
}

// 同步滚动位置
function syncScroll(textarea, overlay) {
    overlay.scrollTop = textarea.scrollTop;
    overlay.scrollLeft = textarea.scrollLeft;
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 初始化当前操作为排序
    currentOperation = 'sort';

    const formatInput = document.getElementById('formatInput');
    
    // 监听输入变化
    formatInput.addEventListener('input', executeOperation);
    formatInput.addEventListener('paste', executeOperation);

    // 绑定复制按钮事件
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.addEventListener('click', () => {
        const resultDiv = document.getElementById('formatResult');
        const textToCopy = resultDiv.textContent;
        copyToClipboard(textToCopy);
    });

    // 监听功能按钮点击
    const buttons = document.querySelectorAll('[data-subtab]');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 移除所有按钮的激活状态
            buttons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的激活状态
            button.classList.add('active');
            // 更新当前操作
            currentOperation = button.getAttribute('data-subtab');
            // 执行操作
            executeOperation();
        });
    });

    // 初始化时执行一次操作
    executeOperation();
});