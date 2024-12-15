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
    }
};

// 当前操作类型
let currentOperation = 'sort';

// 防抖函数
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
                    // 先尝试作为 JSON 解析
                    const obj = JSON.parse(inputValue);
                    result = utils.sortJSON(obj);
                    // 转换为 Unicode
                    result = utils.toUnicode(JSON.stringify(result, null, 2));
                    resultDiv.innerHTML = utils.highlightJSON(JSON.stringify(result, null, 2));
                } catch {
                    // 如果不是有效的 JSON，直接转换文本
                    result = utils.toUnicode(inputValue);
                    input.value = result;
                }
                resultDiv.innerHTML = utils.highlightJSON(result);
                break;
            
            case 'fromUnicode':
                try {
                    // 先转换 Unicode
                    const normalStr = utils.fromUnicode(inputValue);
                    // 尝试作为 JSON 解析和格式化
                    const obj = JSON.parse(normalStr);
                    result = utils.sortJSON(obj);
                    // 更新输入框的值
                    input.value = JSON.stringify(result, null, 2);
                } catch {
                    // 如果不是有效的 JSON，直接转换文本
                    result = utils.fromUnicode(inputValue);
                    input.value = result;
                }
                resultDiv.innerHTML = utils.highlightJSON(result);
                break;
        }
    } catch (e) {
        resultDiv.innerHTML = `<div class="error">错误: ${e.message}</div>`;
    }
}, 300);

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
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('已复制到剪贴板');
        }).catch(err => {
            console.error('复制失败:', err);
        });
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
    // executeOperation();
});