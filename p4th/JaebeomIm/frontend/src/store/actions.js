import {
    REQUEST_DATA_FROM_SPRING,
    REQUEST_RANDOM_SHOP_ITEM,
    REQUEST_MY_INVENTORY,
    REQUEST_CHARACTER_STATUS_FROM_SPRING,
    REQUEST_BOARD_LIST_FROM_SPRING,
    REQUEST_BOARD_FROM_SPRING,
    REQUEST_PRODUCT_LIST_FROM_SPRING,
    REQUEST_PRODUCT_FROM_SPRING,
    REQUEST_FREE_BOARD_LIST_FROM_SPRING,
    REQUEST_FREE_BOARD_FROM_SPRING,
    REQUEST_QUESTION_BOARD_FROM_SPRING, REQUEST_QUESTION_BOARD_LIST_FROM_SPRING,
} from './mutation-types'

// npm install axios --save-dev
import axios from 'axios'

export default {
    // Critical Section 관련 정리가 필요함(월요일)
    requestDataFromSpring ({ commit }) {
        console.log("I'm from action - requestDataFromSpring()")

        return axios.get('http://localhost:7777/30th/vue2spring/test')
            .then((res) => {
                commit(REQUEST_DATA_FROM_SPRING, res.data.randomNumber)
            })
    },
    requestRandomGameItem ({ commit }) {
        console.log("requestGameItemData()")

        return axios.get('http://localhost:7777/31th/rpg-game/random-shop-item-lists')
            .then((res) => {
                commit(REQUEST_RANDOM_SHOP_ITEM, res.data)
            })
    },
    requestBuyItem ({ commit }, payload) {
        console.log("requestBuyItem()")

        return axios.post('http://localhost:7777/31th/rpg-game/buy-item',
            { totalPrice: payload.calculatedPrice, itemLists: payload.selectedItems })
            .then((res) => {
                alert(res.data)
                commit()
            })
    },
    requestMyInventory ({ commit }) {
        console.log("requestMyInventory()")

        return axios.post('http://localhost:7777/31th/rpg-game/my-inventory')
            .then((res) => {
                commit(REQUEST_MY_INVENTORY, res.data)
            })
    },
    requestCharacterStatusFromSpring ({ commit }) {
        console.log("requestCharacterStatusFromSpring()")

        return axios.post('http://localhost:7777/37th/rpg-game/get-character-status')
            .then((res) => {
                commit(REQUEST_CHARACTER_STATUS_FROM_SPRING, res.data)
            })
    },
    requestExperienceExchangeFromSpring ({ dispatch }, payload) {
        console.log("requestExperienceExchangeFromSpring()")

        return axios.post('http://localhost:7777/37th/rpg-game/experience/exchange', payload)
            .then((res) => {
                if (res.data == true) {
                    dispatch('requestCharacterStatusFromSpring')
                }
            })
    },
    requestBoardListFromSpring ({ commit }) {
        console.log('requestBoardListFromSpring()')

        return axios.get('http://localhost:7777/39th/jpa/board/list')
            .then((res) => {
                commit(REQUEST_BOARD_LIST_FROM_SPRING, res.data)
            })
    },
    requestFreeBoardListFromSpring ({ commit }) {
        console.log('requestFreeBoardListFromSpring()')

        return axios.get('http://localhost:7777/insoya/jpa/board/free/list')
            .then((res) => {
                commit(REQUEST_FREE_BOARD_LIST_FROM_SPRING, res.data)
            })
    },
    requestQuestionBoardListFromSpring ({ commit }) {
        console.log('requestQuestionBoardListFromSpring()')

        return axios.get('http://localhost:7777/insoya/jpa/board/question/list')
            .then((res) => {
                commit(REQUEST_QUESTION_BOARD_LIST_FROM_SPRING, res.data)
            })
    },
    requestBoardFromSpring ({ commit }, boardNo) {
        console.log('requestBoardFromSpring()')

        return axios.get(`http://localhost:7777/39th/jpa/board/${boardNo}`)
            .then((res) => {
                commit(REQUEST_BOARD_FROM_SPRING, res.data)
            })
    },
    requestFreeBoardFromSpring ({ commit }, boardNo) {
        console.log('requestFreeBoardFromSpring()')

        return axios.get(`http://localhost:7777/insoya/jpa/board/free/${boardNo}`)
            .then((res) => {
                commit(REQUEST_FREE_BOARD_FROM_SPRING, res.data)
            })
    },
    requestQuestionBoardFromSpring ({ commit }, boardNo) {
        console.log('requestQuestionBoardFromSpring()')

        return axios.get(`http://localhost:7777/insoya/jpa/board/question/${boardNo}`)
            .then((res) => {
                commit(REQUEST_QUESTION_BOARD_FROM_SPRING, res.data)
            })
    },
    // eslint-disable-next-line no-empty-pattern
    requestCreateBoardContentsToSpring ({ }, payload) {
        console.log('requestCreateBoardContentsToSpring()')

        const { title, content, writer } = payload
        return axios.post('http://localhost:7777/39th/jpa/board/register',
            { title, content, writer })
            .then(() => {
                alert('게시물 등록 성공')
            })
    },
    // eslint-disable-next-line no-empty-pattern
    requestCreateFreeBoardContentsToSpring ({ }, payload) {
        console.log('requestCreateFreeBoardContentsToSpring()')

        const { title, content, writer } = payload
        return axios.post('http://localhost:7777/insoya/jpa/board/free/register',
            { title, content, writer })
            .then(() => {
                alert('게시물 등록 성공')
            })
    },
    // eslint-disable-next-line no-empty-pattern
    requestCreateQuestionBoardContentsToSpring ({ }, payload) {
        console.log('requestCreateQuestionBoardContentsToSpring()')

        const { title, content, writer } = payload
        return axios.post('http://localhost:7777/insoya/jpa/board/question/register',
            { title, content, writer })
            .then(() => {
                alert('게시물 등록 성공')
            })
    },
    // eslint-disable-next-line no-empty-pattern
    requestDeleteBoardToSpring ({ }, boardNo) {
        console.log('requestDeleteBoardToSpring()')

        return axios.delete(`http://localhost:7777/39th/jpa/board/${boardNo}`)
            .then(() => {
                alert('삭제 성공')
            })
    },
    // eslint-disable-next-line no-empty-pattern
    requestDeleteFreeBoardToSpring ({ }, boardNo) {
        console.log('requestDeleteFreeBoardToSpring()')

        return axios.delete(`http://localhost:7777/insoya/jpa/board/free/${boardNo}`)
            .then(() => {
                alert('삭제 성공')
            })
    },
    // eslint-disable-next-line no-empty-pattern
    requestBoardModifyToSpring ({ }, payload) {
        console.log('requestBoardModifyToSpring()')

        const { title, content, boardNo, writer, regDate } = payload

        return axios.put(`http://localhost:7777/39th/jpa/board/${boardNo}`,
            { title, content, writer, regDate })
            .then(() => {
                alert('수정 성공')
            })
    },
    // eslint-disable-next-line no-empty-pattern
    requestFreeBoardModifyToSpring ({ }, payload) {
        console.log('requestFreeBoardModifyToSpring()')

        const { title, content, boardNo, writer, regDate } = payload

        return axios.put(`http://localhost:7777/insoya/jpa/board/free/${boardNo}`,
            { title, content, writer, regDate })
            .then(() => {
                alert('수정 성공')
            })
    },
    requestProductListFromSpring ({ commit }) {
        console.log('requestProductListFromSpring()')

        return axios.get('http://localhost:7777/43th/product/list')
            .then((res) => {
                commit(REQUEST_PRODUCT_LIST_FROM_SPRING, res.data)
            })
    },
    requestProductFromSpring ({ commit }, productNo) {
        console.log('requestProductFromSpring()')

        return axios.get(`http://localhost:7777/43th/product/${productNo}`)
            .then((res) => {
                commit(REQUEST_PRODUCT_FROM_SPRING, res.data)
            })
    },
    // eslint-disable-next-line no-empty-pattern
    requestRegisterProductToSpring ({ }, payload) {
        console.log('requestRegisterProductToSpring()')

        const { productName, productDescription, seller, price } = payload
        return axios.post('http://localhost:7777/43th/product/register',
            { productName, productDescription, seller, price })
            .then(() => {
                alert('상품 등록 성공')
            })
    },
    // eslint-disable-next-line no-empty-pattern
    requestDeleteProductToSpring ({ }, productNo) {
        console.log('requestDeleteProductToSpring()')

        return axios.delete(`http://localhost:7777/43th/product/${productNo}`)
            .then(() => {
                alert('삭제 성공')
            })
    },
    // eslint-disable-next-line no-empty-pattern
    requestModifyProductToSpring ({ }, payload) {
        console.log('requestModifyProductToSpring()')

        const { productNo, productName, seller, price, productDescription, regDate } = payload

        return axios.put(`http://localhost:7777/43th/product/${productNo}`,
            { productName, seller, price, productDescription, regDate })
            .then(() => {
                alert('수정 성공')
            })
    },
}