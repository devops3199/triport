import { createSlice } from "@reduxjs/toolkit";
import { produce } from 'immer'; // 불변성 유지
import { config } from "./config";

/* Trilog - 트릴로그 */
const trilogSlice = createSlice({
    name : "trilog",
    initialState : {
        main : {
            list : [],
            is_last : false,
            page : 1,
        },
        detail : {},
        parent_comment : {
            list : [],
            is_last : false,
            page : 1
        },
        loading : {
            main_loading : true,
            detail_loading : true,
        }
    },
    reducers: {
        setMainLoading : (state, action) => produce(state, (draft) => {
            draft.loading.main_loading = action.payload;
        }),

        setDetailLoading : (state, action) => produce(state, (draft) => {
            draft.loading.detail_loading = action.payload;
        }),

        setTrilogMainAdd : (state, action) => produce(state, (draft) => {
            draft.main.list = [...draft.main.list, ...action.payload.results];
            draft.main.is_last = action.payload.last;
        }),

        setTrilogMain : (state, action) => produce(state, (draft) => {
            draft.main.list = action.payload.results;
            draft.main.is_last = action.payload.last;

            draft.main.list.forEach((val) => {

                const max = new Array(50).fill(0); // 한 게시글에 최대 사진 50개가 있다고 가정
                let str = val.information.description;
                const start_str = '![';
        
                max.forEach((v) => {
                    if(str.includes(start_str)) {
                        let begin = str.indexOf(start_str);
                        let end = str.indexOf(')', begin);
                        let img =  str.substring(begin, end + 1);
                        str = str.replace(img, '');
                    }
                })

                val.information.description = str;
            });
            console.log(draft.main.list, 'tets');
        }),

        setTrilogMainPage : (state, action) => produce(state, (draft) => {
            draft.main.page = action.payload;
        }),

        setTrilogLike : (state, action) => produce(state, (draft) => {
            let idx = draft.main.list.findIndex((e) => e.information.id === action.payload);
            draft.main.list[idx].member.isLike = !draft.main.list[idx].member.isLike;
        }),

        setTrilogParentCommentPage : (state, action) => produce(state, (draft) => {
            draft.parent_comment.page = action.payload;
        }),

        setTrilogDetail : (state, action) => produce(state, (draft) => {
            draft.detail = action.payload.results;
            console.log('detail data 바뀜')
        }),

        setTrilogParentComment : (state, action) => produce(state, (draft) => {
            draft.parent_comment.list = action.payload.results;
            draft.parent_comment.is_last = action.payload.last;
        }),

        addTrilogParentCommentScroll : (state, action) => produce(state, (draft) => {
            draft.parent_comment.list = [...draft.parent_comment.list, ...action.payload.results];
            draft.parent_comment.is_last = action.payload.last;
        }),

        editTrilogParentComment : (state, action) => produce(state, (draft) => {
            let idx = draft.parent_comment.list.findIndex((e) => e.commentParent.id === action.payload.results.commentParent.id);
            draft.parent_comment.list[idx].commentParent.contents = action.payload.results.commentParent.contents;
            draft.parent_comment.list[idx].commentParent.modifiedAt = action.payload.results.commentParent.modifiedAt;
        }),

        removeTrilogParentComment : (state, action) => produce(state, (draft) => {
            let idx = draft.parent_comment.list.findIndex((e) => e.commentParent.id === action.payload);
            draft.parent_comment.list.splice(idx, 1);
        }),

        setTrilogChildComment : (state, action) => produce(state, (draft) => {
            const comment = {
                parent_id : action.payload.parent_id,
                list : action.payload.results,
                is_last : action.payload.last,
                page : 1
            };
            draft.child_comment.list = [...draft.child_comment.list, comment];
        }),

        setTrilogDetailLike : (state, action) => produce(state, (draft) => {
            if(draft.detail.member.isLike){
                draft.detail.information.likeNum -= 1;
            } else {
                draft.detail.information.likeNum += 1;
            }
            
            draft.detail.member.isLike = !draft.detail.member.isLike;
        }),

        addTrilogParentComment : (state, action) => produce(state, (draft) => {
            draft.parent_comment.list = [...draft.parent_comment.list, action.payload.results];
            draft.detail.information.commentNum += 1;
        }),

        setTrilogParentCommentLike: (state, action) => produce(state, (draft) => {
            let idx = draft.parent_comment.list.findIndex((e) => e.commentParent.id === action.payload);
            if(draft.parent_comment.list[idx].user.isLike){
                draft.parent_comment.list[idx].commentParent.likeNum -= 1;
                draft.parent_comment.list[idx].user.isLike = !draft.parent_comment.list[idx].user.isLike;
            } else {
                draft.parent_comment.list[idx].commentParent.likeNum += 1;
                draft.parent_comment.list[idx].user.isLike = !draft.parent_comment.list[idx].user.isLike;
            }
        }),

        setTrilogChildCommentLike: (state, action) => produce(state, (draft) => {
            draft.child_comment.list.forEach((val, index) => {
                if(val.id === action.payload) {
                    console.log('skip', val)
                }
            })
        }),

    },
});

// Trilog 메인 게시물 조회
const getTrilogMain = (filter, keyword) => {
    return function (dispatch, getState, { history }) {
        dispatch(setMainLoading(true));
        const access_token = localStorage.getItem("access_token");
        const page = getState().trilog.main.page;
        fetch(`${config}/api/all/boards?page=${page}&filter=${filter}&keyword=${keyword}`, {
            method: 'GET',
            headers: {
                'Authorization' : `${access_token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(page === 1){
                dispatch(setTrilogMain(data));
            } else {
                console.log('Add')
                dispatch(setTrilogMainAdd(data));
            }
            
            if(!data.last) {
                dispatch(setTrilogMainPage(page + 1));
            } else {
                dispatch(setTrilogMainPage(1));
            }
        })
        .catch(err => console.log(err, "메인 error"));
        dispatch(setMainLoading(false));
    };
};

// Trilog 메인 게시물 조회 - 필터 및 검색 적용시
const getTrilogMainFilter = (filter, keyword) => {
    return function (dispatch, getState, { history }) {
        dispatch(setMainLoading(true));
        const access_token = localStorage.getItem("access_token");
        const page = 1;
        fetch(`${config}/api/all/boards?page=${page}&filter=${filter}&keyword=${keyword}`, {
            method: 'GET',
            headers: {
                'Authorization' : `${access_token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(page === 1){
                dispatch(setTrilogMain(data));
            } else {
                dispatch(setTrilogMainAdd(data));
            }
            
            if(!data.last) {
                dispatch(setTrilogMainPage(page + 1));
            } else {
                dispatch(setTrilogMainPage(1));
            }
        })
        .catch(err => console.log(err, "메인 필터 error"));
        dispatch(setMainLoading(false));
    };
};

// Trilog 게시물 상세 조회
const getTrilogDetail = (id) => {
    return async function (dispatch, getState, { history }) {
        dispatch(setDetailLoading(true));
        const page = getState().trilog.parent_comment.page;
        const access_token = localStorage.getItem("access_token");
        const detail = await fetch(`${config}/api/all/boards/detail/${id}`, {
            method: 'GET',
            headers: {
                'Authorization' : `${access_token}`
            }
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err, 'trilog detail'));

        const comment = await fetch(`${config}/api/all/boards/comments/parents/${id}?page=1`, {
            method: 'GET',
            headers: {
                'Authorization' : `${access_token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(!data.last) {
                dispatch(setTrilogParentCommentPage(page + 1));
            } else {
                dispatch(setTrilogParentCommentPage(1));
            }
            return data;
        })
        .catch(err => console.log(err, 'trilog parent comment'));

        dispatch(setTrilogDetail(detail));
        dispatch(setTrilogParentComment(comment));
        dispatch(setDetailLoading(false));
    };
};

// Trilog 메인 게시물 등록
const addTrilog = (trilog) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        if(trilog.is_edit) {
            console.log('edit called')
            fetch(`${config}/api/boards/${trilog.id}`, {
                method: 'PUT',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${access_token}`,
                },
                body: JSON.stringify({
                    title : trilog.title,
                    address : trilog.address,
                    description : trilog.description,
                    imageUrlList : trilog.imageUrlList,
                })
            })
            .then(res => res.json())
            .then(data => {
                alert(data.msg);
                history.replace('/trilog');
            })
            .catch(err => console.log(err, 'Trilog Edit'))
        } else {
            fetch(`${config}/api/boards/`, {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${access_token}`,
                },
                body: JSON.stringify({
                    title : trilog.title,
                    address : trilog.address,
                    description : trilog.description,
                    imageUrlList : trilog.imageUrlList,
                })
            })
            .then(res => res.json())
            .then(data => {
                alert(data.msg);
                history.replace('/trilog');
            })
            .catch(err => console.log(err, 'Trilog Add'))
        }
    };
};

// Trilog 메인 게시물 삭제
const removeTrilog = (id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        fetch(`${config}/api/boards/${id}`, {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            alert(data.msg);
            history.replace('/trilog');
        })
        .catch(err => console.log(err, 'Trilog Delete'))
    };
};

// Trilog 메인 게시물 좋아요
const setLikeTrilog = (id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        fetch(`${config}/api/boards/like/${id}`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 401){
                alert('로그인을 먼저 하세요!');
            } else {
                dispatch(setTrilogLike(id));
            }
        })
        .catch(err => console.log(err, 'trilog like'));
    };
};

// Trilog 상세 게시물 좋아요
const setLikeTrilogDetail = (id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        fetch(`${config}/api/boards/like/${id}`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 401){
                alert('로그인을 먼저 하세요!');
            } else {
                dispatch(setTrilogDetailLike());
            }
        })
        .catch(err => console.log(err, 'trilog detail like'));
    };
};

// Trilog 상세 게시물 - 부모 댓글 더 보기
const getParentCommentScroll = (id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        const page = getState().trilog.parent_comment.page;
        fetch(`${config}/api/all/boards/comments/parents/${id}?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization' : `${access_token}`
            }
        })
        .then(res => res.json())
        .then(data => {     
            console.log(data, 'data');  
            if(!data.last) {
                dispatch(setTrilogParentCommentPage(page + 1));
            } else {
                dispatch(setTrilogParentCommentPage(1));
            }

            dispatch(addTrilogParentCommentScroll(data));
        })
        .catch(err => console.log(err, "부모 댓글 스크롤 error"));
    }
};

// Trilog 상세 게시물 - 부모 댓글 추가
const addParentComment = (id, contents) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        fetch(`${config}/api/boards/comments/parents/${id}`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            },
            body: JSON.stringify({
                contents: contents,
            })
        })
        .then(res => res.json())
        .then(data => {
            dispatch(addTrilogParentComment(data));
            alert(data.msg);
        })
        .catch(err => console.log(err, 'add comment trilog'));
    };
};

// Trilog 상세 게시물 - 부모 댓글 수정
const editParentComment = (id, contents) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        fetch(`${config}/api/boards/comments/parents/${id}`, {
            method : 'PUT',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            },
            body: JSON.stringify({
                contents: contents,
            })
        })
        .then(res => res.json())
        .then(data => {
            dispatch(editTrilogParentComment(data));
            alert(data.msg);
        })
        .catch(err => console.log(err, 'edit comment trilog'));
    };
};

// Trilog 상세 게시물 - 부모 댓글 삭제
const removeParentComment = (id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        fetch(`${config}/api/boards/comments/parents/${id}`, {
            method : 'DELETE',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(removeTrilogParentComment(id));
            alert(data.msg);
        })
        .catch(err => console.log(err, 'remove comment trilog'));
    };
};

// Trilog 상세 게시물 - 자식 댓글 조회
const getChildComment = (id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");

        fetch(`${config}/api/all/boards/comments/children/${id}?page=1`, {
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            },
        })
        .then(res => res.json())
        .then(data => {
            const new_date = { ...data, parent_id : id }
            dispatch(setTrilogChildComment(new_date));
        })
        .catch(err => console.log(err, 'get child comment trilog'));
    };
};

// Trilog 상세 게시물 - 자식 댓글 추가
const addChildComment = (id, contents) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");

        fetch(`${config}/api/boards/comments/children/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            },
            body: JSON.stringify({
                contents: contents,
            })
        })
        .then(res => res.json())
        .catch(err => console.log(err, 'child comment post'));

    };
};

// Trilog 상세 게시물 - 부모 댓글 좋아요
const setParentCommentLike = (id) => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        const api = `${config}/api/boards/comments/parents/like/${id}`;

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            },
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setTrilogParentCommentLike(id));
        })
        .catch(err => console.log(err, 'comment like'));
    };
};


const actionCreators = {
    getTrilogMain,
    getTrilogMainFilter,
    getTrilogDetail,
    addTrilog,
    setLikeTrilog,
    setLikeTrilogDetail,
    addParentComment,
    getChildComment,
    addChildComment,
    getParentCommentScroll,
    setParentCommentLike,
    removeTrilog,
    editParentComment,
    removeParentComment,
};

export const { 
    setMainLoading,
    setDetailLoading,
    setTrilogMain, 
    setTrilogDetail, 
    setTrilogMainPage, 
    setTrilogMainAdd, 
    setTrilogFilter,
    setTrilogLike,
    setTrilogParentComment, 
    setTrilogDetailLike, 
    setTrilogChildComment, 
    addTrilogParentComment, 
    editTrilogParentComment, 
    removeTrilogParentComment, 
    setTrilogParentCommentPage, 
    addTrilogParentCommentScroll, 
    setTrilogParentCommentLike } = trilogSlice.actions;
export default trilogSlice.reducer;
export { actionCreators };