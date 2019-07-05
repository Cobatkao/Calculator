{
    var Calculator = /** @class */ (function () {
        function Calculator() {
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
        Calculator.prototype.createButton = function (text, container, className) {
            var button = document.createElement('button');
            button.textContent = text;
            if (className) {
                button.className = className;
            }
            container.appendChild(button);
            return button;
        };
        Calculator.prototype.createContainer = function () {
            var container = document.createElement('div');
            container.classList.add('calculator');
            document.body.appendChild(container);
            this.container = container;
        };
        Calculator.prototype.createOutput = function () {
            var output = document.createElement('div');
            output.classList.add('output');
            var span = document.createElement('span');
            span.textContent = '0';
            output.appendChild(span);
            this.container.appendChild(output);
            this.span = span;
            this.output = output;
        };
        Calculator.prototype.createButtons = function () {
            var _this = this;
            this.keys.forEach(function (keyRow) {
                var oDiv = document.createElement('div');
                oDiv.classList.add('row');
                keyRow.forEach(function (item) {
                    _this.createButton(item, oDiv, "button btn_" + item);
                });
                _this.container.appendChild(oDiv);
            });
        };
        Calculator.prototype.updateNum = function (name, text) {
            if (this[name]) {
                this[name] += text;
            }
            else {
                this[name] = text;
            }
            this.span.textContent = this[name];
        };
        Calculator.prototype.updateNumber = function (text) {
            if (this.operator) {
                this.updateNum('n2', text);
            }
            else {
                this.updateNum('n1', text);
            }
        };
        Calculator.prototype.updateOperator = function (text) {
            if (!this.n1) {
                this.n1 = this.result;
            }
            this.operator = text;
        };
        Calculator.prototype.updateResult = function () {
            var result;
            var n1 = parseFloat(this.n1);
            var n2 = parseFloat(this.n2);
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
                .replace(/0+$/g, '')
                .replace(/0+e/g, '');
            if (n2 === 0) {
                result = '不是数字';
            }
            this.span.textContent = result.toString();
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.result = result; //单次计算结果
        };
        Calculator.prototype.resetOutput = function () {
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.result = '0';
            this.span.textContent = this.result;
        };
        Calculator.prototype.updateNumberAndOperator = function (text) {
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
        };
        Calculator.prototype.bindEvent = function () {
            var _this = this;
            this.container.addEventListener('click', function (e) {
                if (e.target instanceof HTMLButtonElement) {
                    var button = e.target;
                    var text = button.textContent;
                    console.log('点击按钮', text);
                    _this.updateNumberAndOperator(text);
                }
            });
        };
        return Calculator;
    }());
    new Calculator();
}
