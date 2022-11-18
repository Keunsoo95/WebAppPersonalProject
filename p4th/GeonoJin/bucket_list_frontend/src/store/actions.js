import {
    CHECK_DUPLICATE_EMAIL_TO_SPRING,
    CHECK_DUPLICATE_NICKNAME_TO_SPRING,
    REQUEST_CURRENT_USER_NICKNAME_FROM_SPRING,
    GET_BUCKET_LIST_TO_SPRING,
    REQUEST_BUCKET_FROM_SPRING,
    DOWN_LOAD_IMG_FILE_TO_SPRING
} from './mutation-types'

import axios from "axios";


export default {
    // eslint-disable-next-line no-unused-vars
    async checkDuplicateEmailToSpring({commit}, payload) {

        const {email} = payload;

        await axios.post(`http://localhost:7777/member/check-email/${email}`)
            .then((res) => {
                if (res.data) {
                    alert("사용 가능한 이메일입니다.")
                    commit(CHECK_DUPLICATE_EMAIL_TO_SPRING, res.data);
                } else {
                    alert("중복된 이메일입니다.")
                    commit(CHECK_DUPLICATE_EMAIL_TO_SPRING, res.data);
                }
            })
    },
    async checkDuplicateNicknameToSpring({commit}, payload) {

        const {nickName} = payload;

        await axios.post(`http://localhost:7777/member/check-nickname/${nickName}`)
            .then((res) => {
                if (res.data) {
                    alert("사용 가능한 닉네임입니다.")
                    commit(CHECK_DUPLICATE_NICKNAME_TO_SPRING, res.data);

                } else {
                    alert("사용중인 닉네임입니다.")
                    commit(CHECK_DUPLICATE_NICKNAME_TO_SPRING, res.data);
                }
            })
    },

    // eslint-disable-next-line no-empty-pattern
    signUpDataFromSpring({}, payload) {

        const {email, password, nickName} = payload

        axios.post("http://localhost:7777/member/sign-up", {
            email, password, nickName
        })
            .then((res) => {
                alert("회원 가입 완료!" + res)
            })
            .catch((res) => {
                alert(res.response.data.message)
            })

    },
    async requestCurrentUserNickNameFromSpring({commit}, payload) {

        const {replacedUserValue} = payload

        await axios.post(`http://localhost:7777/member/get-current-user-nickname/${replacedUserValue}`)
            .then((res) => {
                commit(REQUEST_CURRENT_USER_NICKNAME_FROM_SPRING, res.data)
            })
            .catch((res) => {
                console.log(res.data)
            });
    },
    // eslint-disable-next-line no-empty-pattern
    async requestChangeNicknameToSpring({}, payload) {

        const {nickName, currentUserToken} = payload

        console.log(nickName, currentUserToken)

        axios.post("http://localhost:7777/member/set/changeNickname",
            {nickName, currentUserToken})
            .then(() => {
                alert("닉네임 수정 완료")
            })
            .catch((error) => {
                alert(error)
            });
    },

    //버킷리스트
    async getBucketListToSpring({ commit }) {
        console.log('getBucketListToSpring')

        await axios.get('http://localhost:7777/bucket/list')
            .then((res) => {
                commit(GET_BUCKET_LIST_TO_SPRING, res.data);
            });
    },
    async downLoadImgFileToSpring({ commit }, bucketId) {
        console.log('downLoadImgFileToSpring')

        await axios.get(`http://localhost:7777/bucket/imgDownLoad/${bucketId}`)
            .then((res) => {
                commit(DOWN_LOAD_IMG_FILE_TO_SPRING, res.data);
            });
    },
    requestBucketFromSpring({commit}, bucketId) {
        console.log("requestBucketFromSpring")

        axios.get(`http://localhost:7777/bucket/${bucketId}`)
            .then((res) => {
                commit(REQUEST_BUCKET_FROM_SPRING, res.data)
            });
    },
    // eslint-disable-next-line no-empty-pattern
    requestBucketListModifyToSpring({ }, payload) {
        console.log("requestBucketListModifyToSpring")

        const {bucketId, bucketTitle, bucketContent, switchValue, writer, bucketCategory} = payload

        axios.put(`http://localhost:7777/bucket/${bucketId}`,
            {bucketTitle, bucketContent, switchValue, writer, bucketCategory}
        )
            .then(() => {
                alert("수정 되었습니다.")
            })
            .catch(() => {
                alert("수정에 실패했습니다.")
            });
    },
    // eslint-disable-next-line no-empty-pattern
    requestDeleteBucketListToSpring({ }, bucketId){
        console.log("requestDeleteBucketListToSpring")

        axios.delete(`http://localhost:7777/bucket/${bucketId}`)
            .then(() => {
                alert("삭제 되었습니다.")
            })
            .catch(() => {
                alert("삭제되지 않았습니다.")
            });
    }
}