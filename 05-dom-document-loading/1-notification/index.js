export default class NotificationMessage {
    static activeNotification;

    constructor(message, { duration = 0, type = 'success' } = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;

        if (NotificationMessage.activeNotification) {
            NotificationMessage.activeNotification.remove();
        }

        this.render();
    }

    get template() {
        return `
            <div class="notification ${this.type}" style="--value:${this.getTimeDuration()}">
                <div class="timer"></div>
                <div class="inner-wrapper">
                    <div class="notification-header">${this.type}</div>
                    <div class="notification-body">
                        ${this.message}
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = this.template;
        this.element = element.firstElementChild;

        NotificationMessage.activeNotification = this.element;
    }

    show(parent = document.body) {
        parent.append(this.element);

        setTimeout(() => {
            this.remove();
        }, this.duration);
    }

    getTimeDuration() {
        const seconds = ( (this.duration % 60000) / 1000 ).toFixed(0);
        return `${seconds}s`;
    }

    remove() {
        this.element.remove();
    }
    
    destroy() {
        this.remove();
        NotificationMessage.activeNotification = null;
    }
}
