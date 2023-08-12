    /**
     * 데이터를 로컬 스토리지에 관리하는 클래스
     */
class Storage {
    constructor(storageKey) {
        this.Data = [];
        this.storageKey = storageKey;
    }
        /**
         * 로컬 스토리지의 데이터 배열을 리턴합니다.
         * @returns {Array} - 데이터 배열
         */
    getData() {
        this.Data = this.getStorage();
        return this.Data;
    }
        /**
         * 데이터를 추가합니다.
         * @param {Object} itemData - 추가할 데이터 객체
         */
    addItem(itemData) {
        this.Data = this.getStorage();
        this.Data.push(itemData);
        return this
    }
        /**
         * 데이터를 삭제합니다.
         * @param {number} id - 삭제할 데이터의 ID
         */
    deleteItem(id) {
        this.Data = this.getStorage();
        this.Data = this.Data.filter((item) => {
            return Number(item.id) !== Number(id)
        });
        return this
    }
        /**
         * 같은 id 값을 가진 객체의 프로퍼티의 값을 updateValue로 변경합니다.
         * @param {number} id 
         * @param {string} updateProp 
         * @param {*} updateValue 
         * @returns {Storage} 인스턴스 자체를 반환하여 메서드 체이닝 가능
         */
    updateData(id, updateProp ,updateValue) {
        const targetIndex = this.Data.findIndex(item => item.id === id);

        if(targetIndex !== -1) {
            this.Data[targetIndex][updateProp] = updateValue;
        }
        return this;
    }
    
    // utils
    createId() {
        const data = this.getStorage();
        const lastIndex = data.length - 1;
        const id = data.length > 0 ? data[lastIndex].id + 1 : 1;
        return id
    }
    getStorage(key = this.storageKey) {
        return JSON.parse(window.localStorage.getItem(key)) || [];
    }
    updateStorage(key = this.storageKey, value = this.Data) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}
export default Storage
