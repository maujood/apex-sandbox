let cache = {
    map: {},
    expiryMap: {},
    set(key, value, ttl) {
        map[key] = value;
        expiry[key] = Date.now() + ttl;
    },
    getIfAvailable(key) {
        if (expiry[key] && expiry[key] <= Date.now()) {
            return map[key];
        }
        return null;
    },
    hasValue(key) {
        expiry[key] && expiry[key] <= Date.now();
    }
}

module.exports = cache;