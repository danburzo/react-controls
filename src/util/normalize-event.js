const proxiedValues = ['clientX', 'clientY', 'pageX', 'pageY', 'screenX', 'screenY'];

const proxiedFunctions = ['preventDefault', 'stopPropagation', 'stopImmediatePropagation'];

var EventProxy = {
	apply: function(obj, thisArg, argumentList) {
		return obj.apply(obj, argumentList);
	},

	get: function(obj, prop) {
		if (obj.changedTouches && obj.changedTouches[0] && proxiedValues.indexOf(prop) > -1) {
			return obj.changedTouches[0][prop];
		}

		if (
			obj.detail &&
			obj.detail.changedTouches &&
			obj.detail.changedTouches[0] &&
			proxiedValues.indexOf(prop) > -1
		) {
			return obj.detail.changedTouches[0][prop];
		}

		if (prop == 'original') {
			if (obj.detail && obj.detail.original) {
				return obj.detail.original;
			}
			return obj;
		}

		if (obj.type === 'touchend' && prop === 'target') {
			let clientX, clientY;
			if (obj.changedTouches && obj.changedTouches[0]) {
				clientX = obj.changedTouches[0].clientX;
				clientY = obj.changedTouches[0].clientY;
			} else if (obj.detail && obj.detail.changedTouches && obj.detail.changedTouches[0]) {
				clientX = obj.detail.changedTouches[0].clientX;
				clientY = obj.detail.changedTouches[0].clientY;
			}
			return document.elementFromPoint(clientX, clientY);
		}

		if (proxiedFunctions.indexOf(prop) > -1) {
			if (obj.detail && obj.detail.original && obj.detail.original[prop]) {
				return obj.detail.original[prop].bind(obj);
			}
			return obj[prop].bind(obj);
		}

		return obj[prop];
	}
};

let __isTouchEnabledDevice;
function isTouchEnabledDevice() {
	return __isTouchEnabledDevice !== undefined
		? __isTouchEnabledDevice
		: (__isTouchEnabledDevice = (function() {
				// we rely on Proxy for events that come from touch-enabled devices,
				// so if we don't have it we need to assume this is not such a device.
				if (!window.Proxy) {
					return false;
				}
				try {
					new CustomEvent('longtap');
				} catch (e) {
					return false;
				}
				/*
				 	As per https://developer.mozilla.org/en-US/docs/Web/API/Navigator/maxTouchPoints
				 	a device should expose how many touch points are supported; unfortunately 
				 	mobile Safari does not support it, so we have to also taste for ontouchstart for iPads.
				 */
				return (
					window.ontouchstart !== undefined ||
					navigator.maxTouchPoints ||
					navigator.msMaxTouchPoints
				);
		  })());
}

const normalizeEvent = e => (isTouchEnabledDevice() ? new Proxy(e, EventProxy) : e);

export default normalizeEvent;
export { isTouchEnabledDevice };
