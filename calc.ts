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

    bindEvent () {
      this.container.addEventListener('click', (e) => {
        if (e.target instanceof HTMLButtonElement) {
          let button: HTMLButtonElement = e.target
          let text: string = button.textContent
          if ('0123456789'.indexOf(text) >= 0) {
            console.log('数字类型');
            // 如果有操作符
            if (this.operator) {
              if (this.n2) {
                this.n2 = parseInt(this.n2.toString() + text)
              } else {
                this.n2 = parseInt(text)
              }
              this.span.textContent = this.n2.toString()
            } else {
              // 没有操作符
              if (this.n1) {
                this.n1 = parseInt(this.n1.toString() + text)
              } else {
                this.n1 = parseInt(text)
              }
              this.span.textContent = this.n1.toString()
            }
          } else if ('+-*÷'.indexOf(text) >= 0) {
            this.operator = text
          } else if ('='.indexOf(text) >= 0) {
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
          } else {
            console.log('不知道类型');
          }
        } else {
        }
      })
    }
  }
  new Calculator()
}