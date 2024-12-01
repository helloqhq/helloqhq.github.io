document.addEventListener('DOMContentLoaded', function() {
    // JSON比对功能
    document.getElementById('compareBtn').addEventListener('click', function() {
        try {
            const json1 = JSON.parse(document.getElementById('json1').value);
            const json2 = JSON.parse(document.getElementById('json2').value);
            const result = compareJSON(json1, json2);
            document.getElementById('result').innerHTML = result;
        } catch (e) {
            document.getElementById('result').innerHTML = '解析JSON出错：' + e.message;
        }
    });

    // 格式化功能
    document.getElementById('formatBtn').addEventListener('click', function() {
        try {
            const json1 = document.getElementById('json1').value;
            const json2 = document.getElementById('json2').value;
            if (json1) {
                document.getElementById('json1').value = JSON.stringify(JSON.parse(json1), null, 2);
            }
            if (json2) {
                document.getElementById('json2').value = JSON.stringify(JSON.parse(json2), null, 2);
            }
        } catch (e) {
            document.getElementById('result').innerHTML = '格式化失败：' + e.message;
        }
    });

    // Unicode转换功能
    document.getElementById('toUnicode').addEventListener('click', function() {
        const input = document.getElementById('unicodeInput').value;
        const unicode = stringToUnicode(input);
        document.getElementById('unicodeInput').value = unicode;
    });

    document.getElementById('fromUnicode').addEventListener('click', function() {
        const input = document.getElementById('unicodeInput').value;
        const text = unicodeToString(input);
        document.getElementById('unicodeInput').value = text;
    });
});

// JSON比对函数
function compareJSON(obj1, obj2) {
    let differences = [];
    
    function compare(obj1, obj2, path = '') {
        if (typeof obj1 !== typeof obj2) {
            differences.push(`${path}: 类型不同 (${typeof obj1} vs ${typeof obj2})`);
            return;
        }
        
        if (typeof obj1 === 'object' && obj1 !== null) {
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);
            
            // 检查多余的键
            keys1.forEach(key => {
                if (!keys2.includes(key)) {
                    differences.push(`${path}${key}: 在第二个JSON中不存在`);
                }
            });
            
            keys2.forEach(key => {
                if (!keys1.includes(key)) {
                    differences.push(`${path}${key}: 在第一个JSON中不存在`);
                }
            });
            
            // 递归比较共同的键
            keys1.filter(key => keys2.includes(key)).forEach(key => {
                compare(obj1[key], obj2[key], `${path}${key}.`);
            });
        } else if (obj1 !== obj2) {
            differences.push(`${path.slice(0, -1)}: 值不同 (${obj1} vs ${obj2})`);
        }
    }
    
    compare(obj1, obj2);
    return differences.length ? differences.join('<br>') : '两个JSON完全相同';
}

// Unicode转换函数
function stringToUnicode(str) {
    return str.split('').map(char => {
        const unicode = char.charCodeAt(0).toString(16);
        return `\\u${unicode.padStart(4, '0')}`;
    }).join('');
}

function unicodeToString(str) {
    return str.replace(/\\u[\dA-F]{4}/gi, match => {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
} 