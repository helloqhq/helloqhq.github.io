// 工具函数
const utils = {
    // JSON 排序
    sortJSON(obj, recursive = true) {
        if (typeof obj !== 'object' || obj === null) return obj;
        
        if (Array.isArray(obj)) {
            return obj.map(item => recursive ? this.sortJSON(item, true) : item);
        }
        
        return Object.keys(obj)
            .sort()
            .reduce((acc, key) => {
                acc[key] = recursive ? this.sortJSON(obj[key], true) : obj[key];
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

    // 比较两个值是否相等
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
    const recursiveSort = document.getElementById('recursiveSort');

    try {
        let result;
        switch (currentOperation) {
            case 'sort':
                const obj = JSON.parse(input.value);
                result = utils.sortJSON(obj, recursiveSort.checked);
                resultDiv.innerHTML = utils.highlightJSON(JSON.stringify(result, null, 2));
                break;
            
            case 'toUnicode':
                result = utils.toUnicode(input.value);
                resultDiv.innerHTML = utils.highlightJSON(result);
                break;
            
            case 'fromUnicode':
                result = utils.fromUnicode(input.value);
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

// 添加自动比对功能
function autoCompare() {
    const input1 = document.getElementById('compareInput1');
    const input2 = document.getElementById('compareInput2');
    const diffResult = document.getElementById('diffResult');

    try {
        const json1 = JSON.parse(input1.value || '{}');
        const json2 = JSON.parse(input2.value || '{}');
        const diffHtml = utils.compareJSON(json1, json2);
        diffResult.innerHTML = `<pre>${diffHtml}</pre>`;
    } catch (e) {
        diffResult.innerHTML = `<div class="error">错误: ${e.message}</div>`;
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    initThemeSettings();
    initTabs();
    
    const formatInput = document.getElementById('formatInput');
    const recursiveSort = document.getElementById('recursiveSort');

    // 监听输入变化（包括粘贴事件）
    formatInput.addEventListener('input', executeOperation);
    formatInput.addEventListener('paste', executeOperation);
    recursiveSort.addEventListener('change', executeOperation);

    // 绑定复制按钮事件
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.addEventListener('click', () => {
        const resultDiv = document.getElementById('formatResult');
        const textToCopy = resultDiv.textContent;
        copyToClipboard(textToCopy);
    });

    // 监听子标签页切换
    const subTabs = document.querySelectorAll('.sub-tab');
    subTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            subTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentOperation = tab.dataset.subtab;
            executeOperation(); // 切换操作类型后立即执行
        });
    });

    // 初始化第一个标签页为激活状态
    document.querySelector('.nav-tab[data-tab="format"]').click();

    // 添加比对输入框的事件监听
    const compareInput1 = document.getElementById('compareInput1');
    const compareInput2 = document.getElementById('compareInput2');

    const debouncedCompare = debounce(autoCompare, 300);

    compareInput1.addEventListener('input', debouncedCompare);
    compareInput2.addEventListener('input', debouncedCompare);
    compareInput1.addEventListener('paste', debouncedCompare);
    compareInput2.addEventListener('paste', debouncedCompare);
});