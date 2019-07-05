"use strict";
{
    class Calculator {
        constructor() {
            this.n1 = null;
            this.n2 = null;
            this.keys = [
                ['clear', '÷'],
                ['7', '8', '9', '+'],
                ['4', '5', '6', '-'],
                ['1', '2', '3', '*'],
                ['0', '.', '=']
            ];
            this.createContainer();
            this.createOutput();
            this.createButtons();
            this.bindEvent();
        }
        createButton(text, container, className) {
            let button = document.createElement('button');
            button.textContent = text;
            if (className) {
                button.className = className;
            }
            container.appendChild(button);
            return button;
        }
        createContainer() {
            const container = document.createElement('div');
            container.classList.add('calculator');
            document.body.appendChild(container);
            this.container = container;
        }
        createOutput() {
            const output = document.createElement('div');
            output.classList.add('output');
            const span = document.createElement('span');
            span.textContent = '0';
            output.appendChild(span);
            this.container.appendChild(output);
            this.span = span;
            this.output = output;
        }
        createButtons() {
            this.keys.forEach((keyRow) => {
                let oDiv = document.createElement('div');
                oDiv.classList.add('row');
                keyRow.forEach((item) => {
                    this.createButton(item, oDiv, `button btn_${item}`);
                });
                this.container.appendChild(oDiv);
            });
        }
        updateNum(name, text) {
            if (this[name]) {
                this[name] += text;
            }
            else {
                this[name] = text;
            }
            this.span.textContent = this[name];
        }
        updateNumber(text) {
            if (this.operator) {
                this.updateNum('n2', text);
            }
            else {
                this.updateNum('n1', text);
            }
        }
        updateOperator(text) {
            if (!this.n1) {
                this.n1 = this.result;
            }
            this.operator = text;
        }
        updateResult() {
            let result;
            let n1 = parseFloat(this.n1);
            let n2 = parseFloat(this.n2);
            if (this.operator === '+') {
                result = n1 + n2;
            }
            else if (this.operator === '-') {
                result = n1 - n2;
            }
            else if (this.operator === '*') {
                result = n1 * n2;
            }
            else if (this.operator === '÷') {
                result = n1 / n2;
            }
            result = result
                .toPrecision(12)
                .replace(/.0+$/g, '')
                .replace(/.0+e/g, '');
            if (n2 === 0) {
                result = '不是数字';
            }
            this.span.textContent = result.toString();
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.result = result; //单次计算结果
        }
        resetOutput() {
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.result = '0';
            this.span.textContent = this.result;
        }
        updateNumberAndOperator(text) {
            if ('0123456789.'.indexOf(text) >= 0) {
                this.updateNumber(text);
            }
            else if ('+-*÷'.indexOf(text) >= 0) {
                this.updateOperator(text);
            }
            else if ('='.indexOf(text) >= 0) {
                this.updateResult();
            }
            else if (text === 'clear') {
                this.resetOutput();
            }
        }
        bindEvent() {
            this.container.addEventListener('click', e => {
                if (e.target instanceof HTMLButtonElement) {
                    let button = e.target;
                    let text = button.textContent;
                    console.log('点击按钮', text);
                    this.updateNumberAndOperator(text);
                }
            });
        }
    }
    new Calculator();
}
