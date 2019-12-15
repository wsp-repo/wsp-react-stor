class WspReactStor {
	constructor() {
		this.__binds = {};
		this.__stors = {};
	};

	/**
	 * генератор нового ключа
	 */
	_newBindId() {
		const rnd = 1000 * Math.random();
		return `${Date.now()}-${Math.floor(rnd)}`;
	};

	/**
	 * выполнить функцию подписки на изменения стора
	 *
	 * @param {string} storKey - ключ записи стора
	 * @param {string} bindId - идентификатор привязки
	 */
	_runBindFunc(storKey, bindId) {
		let timer = setTimeout(() => {
			clearTimeout(timer); timer = undefined;

			if (!this.__binds[storKey][bindId] ||
				!this.__binds[storKey][bindId]['reset']
			) return;

			this.__binds[storKey][bindId]['reset'] = false;
			this.__binds[storKey][bindId]['func'](
				this.getStor(storKey), storKey
			);
		}, 10);
	};

	/**
	 * выполнить функции подписки на изменения стора
	 *
	 * @param {string} storKey - ключ записи стора
	 */
	_runBindFuncs(storKey) {
		if (!this.__binds[storKey]) return;

		Object.keys(this.__binds[storKey]).forEach((bindId) => {
			this.__binds[storKey][bindId]['reset'] = true;
			this._runBindFunc(storKey, bindId);
		});
	};

	/**
	 * запросить текущие мгновенные данные
	 *
	 * @param {string} storKey - ключ записи стора
	 */
	getStor(storKey) {
		if (this.__stors[storKey] !== undefined) {
			return this.__stors[storKey];
		};

		return undefined;
	};

	/**
	 * внести изменения в стор
	 *
	 * @param {string} storKey - ключ записи стора
	 * @param {any} storVal - новое значение записи стора
	 * @param {function?} cbFunc - обработчик готовности
	 */
	setStor(storKey, storVal, cbFunc) {
		this.__stors[storKey] = storVal;
		this._runBindFuncs(storKey);

		if (typeof cbFunc === 'function') {
			setTimeout(cbFunc, 15);
		};
	};


	/**
	 * приcвязать слушателя к записи стора
	 *
	 * @param {string} storKey - ключ записи стора
	 * @param {function} cbFunc - функция слушатель
	 */
	bindStor(storKey, cbFunc) {
		if (typeof cbFunc !== 'function') {
			return false;
		};

		if (!this.__binds[storKey]) {
			this.__binds[storKey] = {};
		};

		const bindId = this._newBindId();
		this.__binds[storKey][bindId] = {
			'func': cbFunc, 'reset': false
		};
		return bindId;
	};

	/**
	 * отвязать слушателя изменения записи стора
	 *
	 * @param {string} storKey - ключ записи стора
	 * @return {string} bindId - ключ связывания
	 */
	unbindStor(storKey, bindId) {
		if (!this.__binds[storKey]) return;
		if (!this.__binds[storKey][bindId]) return;

		this.__binds[storKey][bindId] = false;
		delete this.__binds[storKey][bindId];
	};
};

module.exports = WspReactStor;
