export class EventEmitter {
  constructor() {
    this.event = {};
  }
  on(eventName, callback) {
    if (this.event[eventName]) {
      this.event[eventName].push(callback);
    } else {
      this.event[eventName] = [callback];
    }
  }
  emit(eventName, ...rest) {
    if (this.event[eventName]) {
      this.event[eventName].forEach((callback) => {
        callback.apply(rest);
      });
    }
  }
}
