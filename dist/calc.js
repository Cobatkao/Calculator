"use strict";
{
    class Calculator {
    }
    function createButton(text, container, className) {
        let button = document.createElement('button');
        button.textContent = text;
        if (className) {
            button.className = className;
        }
        container.appendChild(button);
        return button;
    }
    const container = document.createElement('div');
    container.classList.add('calculator');
    document.body.appendChild(container);
    const output = document.createElement('div');
    output.classList.add('output');
    const span = document.createElement('span');
    span.textContent = '0';
    output.appendChild(span);
    container.appendChild(output);
    let operator;
    let n1;
    let n2;
    // 事件委托
    container.addEventListener('click', function (e) {
        if (e.target instanceof HTMLButtonElement) {
            let button = e.target;
            let text = button.textContent;
            if ('0123456789'.indexOf(text) >= 0) {
                console.log('数字类型');
                // 如果有操作符
                if (operator) {
                    if (n2) {
                        n2 = parseInt(n2.toString() + text);
                    }
                    else {
                        n2 = parseInt(text);
                    }
                    span.textContent = n2.toString();
                }
                else {
                    // 没有操作符
                    if (n1) {
                        n1 = parseInt(n1.toString() + text);
                    }
                    else {
                        n1 = parseInt(text);
                    }
                    span.textContent = n1.toString();
                }
            }
            else if ('+-*÷'.indexOf(text) >= 0) {
                operator = text;
            }
            else if ('='.indexOf(text) >= 0) {
                let rel;
                if (operator === '+') {
                    rel = n1 + n2;
                }
                else if (operator === '-') {
                    rel = n1 - n2;
                }
                else if (operator === '*') {
                    rel = n1 * n2;
                }
                else if (operator === '÷') {
                    rel = n1 / n2;
                }
                span.textContent = rel.toString();
            }
            else {
                console.log('不知道类型');
            }
            console.log(n1, operator, n2);
        }
        else {
        }
    });
    const keys = [
        ['clear', '÷'],
        ['7', '8', '9', '+'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '*'],
        ['0', '.', '=']
    ];
    keys.forEach((keyRow) => {
        let oDiv = document.createElement('div');
        oDiv.classList.add('row');
        keyRow.forEach((item) => {
            createButton(item, oDiv, `button btn_${item}`);
        });
        container.appendChild(oDiv);
    });
    // for (const keyRow: Array<string> of keys) {
    //   let oDiv: HTMLDivElement = document.createElement('div')
    //   for (const item: string of keyRow) {
    //     createButton(item, oDiv)
    //   }
    //   document.body.appendChild(oDiv)
    // }
}
