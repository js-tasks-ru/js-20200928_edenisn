export default class ColumnChart {
    element;
    chartHeight = 50;
    innerElements = {};

    constructor({ data = [], label = '', value = 0, link = '' } = {}) {
        this.data = data;
        this.label = label;
        this.value = value;
        this.link = link;

        this.render();
    }

    get template() {
        return `
            <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
                <div class="column-chart__title">
                    Total ${this.label}
                    ${this.getLink()}
                </div>
                <div class="column-chart__container">
                    <div data-element="header" class="column-chart__header">
                        ${this.value}
                    </div>
                    <div data-element="body" class="column-chart__chart">
                        ${this.getTemplateBody(this.data)}
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        const elem = document.createElement("div");
        elem.innerHTML = this.template;
        this.element = elem.firstElementChild;

        if (this.data.length) {
            this.element.classList.remove("column-chart_loading");
        }

        this.innerElements = this.getInnerElements(this.element);
    }

    getInnerElements(element) {
        const elements = element.querySelectorAll('div[data-element]');

        return [...elements].reduce((accumulator, innerElement) => {
            accumulator[innerElement.dataset.element] = innerElement;
            return accumulator;
        }, {});
    }

    getLink() {
        return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
    }

    getTemplateBody(data) {
        const maxVal = Math.max.apply(null, data);

        return data.map(item => {
            const scale = this.chartHeight / maxVal;
            const percent = ( item / maxVal * 100 ).toFixed();
            const value = Math.floor(item * scale);

            return `<div style="--value: ${value}" data-tooltip="${percent}%"></div>`;
        }).join('');
    }

    update( bodyData ) {
        this.innerElements.body.innerHTML = this.getTemplateBody(bodyData);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        this.innerElements = {};
    }
}
