{
  class Calculator {
    public container: HTMLDivElement;
    private output: HTMLDivElement;
    private span: HTMLSpanElement;
    public operator: string;
    public n1: number;
    public n2: number;
    private keys: Array<Array<string>> = [
      ['clear', '÷'],
      ['7', '8', '9', '+'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '*'],
      ['0', '.', '=']
    ];
    
    constructor() {
      this.createContainer()
      this.createOutput()
      this.createButtons()      
      this.bindEvent()
    }

    createButton (text: string, container: HTMLElement, className: string) {
      let button: HTMLButtonElement = document.createElement('button')
      button.textContent = text
      if (className) { button.className = className }
      container.appendChild(button)
      return button
    }

    createContainer () {
      const container: HTMLDivElement = document.createElement('div')
      container.classList.add('calculator')
      document.body.appendChild(container)
      this.container = container
    }

    createOutput () {
      const output: HTMLDivElement = document.createElement('div')
      output.classList.add('output')
      const span: HTMLSpanElement = document.createElement('span')
      span.textContent = '0'
      output.appendChild(span)
      this.container.appendChild(output)
      this.span = span
      this.output = output 
    }

    createButtons () {
      this.keys.forEach((keyRow: Array<string>) => {
        let oDiv: HTMLDivElement = document.createElement('div')
        oDiv.classList.add('row')
        keyRow.forEach((item: string) => {
          this.createButton(item, oDiv, `button btn_${item}`)
        })
        this.container.appendChild(oDiv)
      })
    }

    updateNum (n: number, text: string): void {
      if (n) {
        n = parseInt(n.toString() + text)
      } else {
        n = parseInt(text)
      }
      this.span.textContent = n.toString()
    }

    updateNumber (text: string): void {
      if (this.operator) {
        this.updateNum(this.n2, text)
      } else {
        this.updateNum(this.n1, text)
      }
    }

    updateOperator (text: string): void {
      this.operator = text
    }

    updateResult (): void {
      let result
      if (this.operator === '+') {
        result = this.n1 + this.n2
      } else if (this.operator === '-') {
        result = this.n1 - this.n2
      } else if (this.operator === '*') {
        result = this.n1 * this.n2
      } else if (this.operator === '÷') {
        result = this.n1 / this.n2
      }
      this.span.textContent = result.toString()
    }

    updateNumberAndOperator (text: string): void {
      if ('0123456789'.indexOf(text) >= 0) {
        this.updateNumber(text)
      } else if ('+-*÷'.indexOf(text) >= 0) {
        this.updateOperator(text)
      } else if ('='.indexOf(text) >= 0) {
        this.updateResult()
      }
    }

    bindEvent (): void {
      this.container.addEventListener('click', (e) => {
        if (e.target instanceof HTMLButtonElement) {
          let button: HTMLButtonElement = e.target
          let text = button.textContent
          this.updateNumberAndOperator(text)
        } else {
          return
        }
      })
    }
  }
  new Calculator()
}