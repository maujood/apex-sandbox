let cache = {
    map: {},
    expiryMap: {},
    set(key, value, ttl) {
        this.map[key] = value;
        this.expiryMap[key] = Date.now() + ttl;
    },
    getIfAvailable(key) {
        if (this.expiryMap[key] && this.expiryMap[key] >= Date.now()) {
            return this.map[key];
        }
        return null;
    },
    hasValue(key) {
        this.expiryMap[key] && this.expiryMap[key] >= Date.now();
    }
}

module.exports = cache;