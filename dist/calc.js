"use strict";
{
    class Calculator {
        constructor() {
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
        updateNum(n, text) {
            if (n) {
                n = parseInt(n.toString() + text);
            }
            else {
                n = parseInt(text);
            }
            this.span.textContent = n.toString();
        }
        updateNumber(text) {
            if (this.operator) {
                this.updateNum(this.n2, text);
            }
            else {
                this.updateNum(this.n1, text);
            }
        }
        updateOperator(text) {
            this.operator = text;
        }
        updateResult() {
            let result;
            if (this.operator === '+') {
                result = this.n1 + this.n2;
            }
            else if (this.operator === '-') {
                result = this.n1 - this.n2;
            }
            else if (this.operator === '*') {
                result = this.n1 * this.n2;
            }
            else if (this.operator === '÷') {
                result = this.n1 / this.n2;
            }
            this.span.textContent = result.toString();
        }
        updateNumberAndOperator(text) {
            if ('0123456789'.indexOf(text) >= 0) {
                this.updateNumber(text);
            }
            else if ('+-*÷'.indexOf(text) >= 0) {
                this.updateOperator(text);
            }
            else if ('='.indexOf(text) >= 0) {
                this.updateResult();
            }
        }
        bindEvent() {
            this.container.addEventListener('click', e => {
                if (e.target instanceof HTMLButtonElement) {
                    let button = e.target;
                    let text = button.textContent;
                    this.updateNumberAndOperator(text);
                }
                else {
                    return;
                }
            });
        }
    }
    new Calculator();
}
