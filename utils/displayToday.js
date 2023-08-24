
/**
 * 금일 날짜 정보를 element의 textContent에 넣습니다.
 * Ex) 2023.8.13(일)
 * @param {Element} todayElement 
 */
export function displayToday(todayElement) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const week = today.getDay();
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    todayElement.textContent = `${year}.${month}.${day}(${dayOfWeek[week]})`;
}
