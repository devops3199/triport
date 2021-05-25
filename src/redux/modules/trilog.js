import { createSlice } from "@reduxjs/toolkit";
import { produce } from 'immer'; // 불변성 유지
import { config } from "./config";
import Swal from "sweetalert2";

/* Trilog - 트릴로그 */
const trilogSlice = createSlice({
    name : "trilog",
    initialState : {
        main : {
            list : [],
            is_last : false,
            page : 1,
            filter : 'likeNum',
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
        // Trilog 메인 페이지 - 내용 로딩 여부
        setMainLoading : (state, action) => produce(state, (draft) => {
            draft.loading.main_loading = action.payload;
        }),
        // Trilog 상세 페이지 - 내용 로딩 여부
        setDetailLoading : (state, action) => produce(state, (draft) => {
            draft.loading.detail_loading = action.payload;
        }),
        // Trilog 메인 페이지 - 무한 스크롤 더 가져오기
        setTrilogMainAdd : (state, action) => produce(state, (draft) => {
            draft.main.list = [...draft.main.list, ...action.payload.results];
            draft.main.is_last = action.payload.last;
        }),
        // Trilog 수정 페이지 - 게시글 수정
        setTrilogMainEdit : (state, action) => produce(state, (draft) => {
            if(draft.main.list.length > 0) {
                let idx = draft.main.list.findIndex((e) => e.information.id === parseInt(action.payload.id));
                draft.main.list[idx].information.title = action.payload.title;
                draft.main.list[idx].information.address = action.payload.address;
                draft.main.list[idx].information.description = action.payload.description;
    
                if(action.payload.imageUrlList.length !== 0) {
                    draft.main.list[idx].information.thumbNailUrl = action.payload.imageUrlList[0].imageFilePath;
                } else {
                    draft.main.list[idx].information.thumbNailUrl = '';
                }
            }
        }),
        // Trilog 메인 페이지 - 게시글 조회
        setTrilogMain : (state, action) => produce(state, (draft) => {
            draft.main.list = action.payload.results;
            draft.main.is_last = action.payload.last;
        }),
        // Trilog 메인 페이지 - 필터 설정
        setTrilogMainFilter : (state, action) => produce(state, (draft) => {
            draft.main.filter = action.payload;
        }),
        // Trilog 메인 페이지 - 무한 스크롤 페이지 설정(다음 게시물이 있나 없나)
        setTrilogMainPage : (state, action) => produce(state, (draft) => {
            draft.main.page = action.payload;
        }),
        // Trilog 메인 페이지 - 게시글 좋아요
        setTrilogLike : (state, action) => produce(state, (draft) => {
            let idx = draft.main.list.findIndex((e) => e.information.id === action.payload);
            draft.main.list[idx].member.isLike = !draft.main.list[idx].member.isLike;
            if(draft.main.list[idx].member.isLike) {
                draft.main.list[idx].information.likeNum += 1;
            } else {
                draft.main.list[idx].information.likeNum -= 1;
            }
        }),
        // Trilog 상세 페이지 - 게시물 삭제
        removeTrilogDetail : (state, action) => produce(state, (draft) => {
            draft.main.list = draft.main.list.filter((e) => e.information.id !== parseInt(action.payload));
        }),
        // Trilog 상세 페이지 - 부모 댓글 페이징 설정(다음 부모 댓글 있나 없나)
        setTrilogParentCommentPage : (state, action) => produce(state, (draft) => {
            draft.parent_comment.page = action.payload;
        }),
        // Trilog 상세 페이지 - 해당 게시글 조회
        setTrilogDetail : (state, action) => produce(state, (draft) => {
            draft.detail = action.payload.results;
        }),
        // Trilog 상세 페이지 - 부모 댓글 조회
        setTrilogParentComment : (state, action) => produce(state, (draft) => {
            draft.parent_comment.list = action.payload.results;
            draft.parent_comment.is_last = action.payload.last;
        }),
        // Trilog 상세 페이지 - 부모 댓글 페이징(다음 부모 댓글 조회)
        addTrilogParentCommentScroll : (state, action) => produce(state, (draft) => {
            draft.parent_comment.list = [...draft.parent_comment.list, ...action.payload.results];
            draft.parent_comment.is_last = action.payload.last;
        }),
        // Trilog 상세 페이지 - 부모 댓글 수정
        editTrilogParentComment : (state, action) => produce(state, (draft) => {
            let idx = draft.parent_comment.list.findIndex((e) => e.commentParent.id === action.payload.results.commentParent.id);
            draft.parent_comment.list[idx].commentParent.contents = action.payload.results.commentParent.contents;
            draft.parent_comment.list[idx].commentParent.createdAt = action.payload.results.commentParent.createdAt;
        }),
        // Trilog 상세 페이지 - 부모 댓글 삭제
        removeTrilogParentComment : (state, action) => produce(state, (draft) => {
            let idx = draft.parent_comment.list.findIndex((e) => e.commentParent.id === action.payload);
            draft.parent_comment.list.splice(idx, 1);
        }),
        // Trilog 상세 페이지 - 게시글 좋아요
        setTrilogDetailLike : (state, action) => produce(state, (draft) => {
            if(draft.detail.member.isLike){
                draft.detail.information.likeNum -= 1;
            } else {
                draft.detail.information.likeNum += 1;
            }
            
            draft.detail.member.isLike = !draft.detail.member.isLike;
        }),
        // Trilog 상세 페이지 - 부모 댓글 작성
        addTrilogParentComment : (state, action) => produce(state, (draft) => {
            draft.parent_comment.list = [...draft.parent_comment.list, action.payload.results];
            draft.detail.information.commentNum += 1;
        }),
        // Trilog 상세 페이지 - 부모 댓글 좋아요
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
        dispatch(setTrilogMainFilter(filter));
    };
};

// Trilog 마이 페이지 게시물 조회 - 마이 페이지 내가 쓴 글 조회
const getTrilogMainMyPage = () => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        const api = `${config}/api/boards/member`;
    
        fetch(api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${access_token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(setTrilogMain(data));
          })
          .catch((err) => {
            console.log(err);
          });
      };
};

// Trilog 마이 페이지 게시물 조회 - 마이 페이지 내가 좋아요한 게시물 조회
const getTrilogMainMyPageLike = () => {
    return function (dispatch, getState, { history }) {
        const access_token = localStorage.getItem("access_token");
        const api = `${config}/api/boards/member/like`;
    
        fetch(api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${access_token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(setTrilogMain(data));
          })
          .catch((err) => {
            console.log(err);
          });
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
        const filter = getState().trilog.main.filter;
        const access_token = localStorage.getItem("access_token");
        if(trilog.is_edit) {
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
                if(data.status === 401) {
                    Swal.fire({
                        title: "로그인",
                        text: "로그인을 먼저 해주세요.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "로그인하기",
                        cancelButtonText: "닫기",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            history.push("/login");
                        }
                    });
                } else if(data.status === 200) {
                    Swal.fire({
                        title: data.msg,
                        icon: "success",
                    });
                    window.scrollTo(0, 0);
                    dispatch(setTrilogMainEdit(trilog));
                    history.push('/trilog');
                } else {
                    Swal.fire({
                        title: data.msg,
                        icon: "warning",
                    });
                }
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
                if(data.status === 401) {
                    Swal.fire({
                        title: "로그인",
                        text: "로그인을 먼저 해주세요.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "로그인하기",
                        cancelButtonText: "닫기",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            history.push("/login");
                        }
                    });
                } else if(data.status === 200) {
                    Swal.fire({
                        title: data.msg,
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "확인"
                    }).then((result) => {
                        if(result.isConfirmed && data.subMsg !== "no change") {
                            Swal.fire({
                                title: "🎉축하드려요🎉",
                                html: `🥳 당신의 등급은 ${data.subMsg}! <br/> 등급이 궁금하다면 마이페이지에 가보세요!`,
                                icon: "success"
                            })
                        }
                    });
                    window.scrollTo(0, 0);
                    dispatch(setTrilogMainPage(1));
                    dispatch(setTrilogMainFilter("likeNum"));
                    dispatch(getTrilogMain("likeNum", ""));
                    history.push('/trilog');
                } else {
                    Swal.fire({
                        title: data.msg,
                        icon: "warning",
                    });
                }
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
            if(data.status === 401) {
                Swal.fire({
                    title: "로그인",
                    text: "로그인을 먼저 해주세요.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "로그인하기",
                    cancelButtonText: "닫기",
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("/login");
                    }
                });
            } else if(data.status === 200) {
                dispatch(removeTrilogDetail(id));
                Swal.fire({
                    title: data.msg,
                    icon: "success",
                });
                history.replace('/trilog');
            } else {
                Swal.fire({
                    title: data.msg,
                    icon: "warning",
                });
            }
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
                Swal.fire({
                    title: "로그인",
                    text: "로그인을 먼저 해주세요.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "로그인하기",
                    cancelButtonText: "닫기",
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("/login");
                    }
                });
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
                Swal.fire({
                    title: "로그인",
                    text: "로그인을 먼저 해주세요.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "로그인하기",
                    cancelButtonText: "닫기",
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("/login");
                    }
                });
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
            if(data.status === 401) {
                Swal.fire({
                    title: "로그인",
                    text: "로그인을 먼저 해주세요.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "로그인하기",
                    cancelButtonText: "닫기",
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("/login");
                    }
                });
            } else if(data.status === 200) {
                if(!data.last) {
                    dispatch(setTrilogParentCommentPage(page + 1));
                } else {
                    dispatch(setTrilogParentCommentPage(1));
                }
    
                dispatch(addTrilogParentCommentScroll(data));
            } else {
                Swal.fire({
                    title: data.msg,
                    icon: "warning",
                });
            }
        })
        .catch(err => console.log(err, "parent comment scroll error"));
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
            if(data.status === 401) {
                Swal.fire({
                    title: "로그인",
                    text: "로그인을 먼저 해주세요.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "로그인하기",
                    cancelButtonText: "닫기",
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("/login");
                    }
                });
            } else if(data.status === 200) {
                dispatch(addTrilogParentComment(data));
                Swal.fire({
                    title: data.msg,
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: data.msg,
                    icon: "warning",
                });
            }
            
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
            if(data.status === 401) {
                Swal.fire({
                    title: "로그인",
                    text: "로그인을 먼저 해주세요.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "로그인하기",
                    cancelButtonText: "닫기",
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("/login");
                    }
                });
            } else if(data.status === 200) {
                dispatch(editTrilogParentComment(data));
                Swal.fire({
                    title: data.msg,
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: data.msg,
                    icon: "warning",
                });
            }
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
            if(data.status === 401) {
                Swal.fire({
                    title: "로그인",
                    text: "로그인을 먼저 해주세요.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "로그인하기",
                    cancelButtonText: "닫기",
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("/login");
                    }
                });
            } else if(data.status === 200) {
                dispatch(removeTrilogParentComment(id));
                Swal.fire({
                    title: data.msg,
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: data.msg,
                    icon: "warning",
                });
            }
        })
        .catch(err => console.log(err, 'remove comment trilog'));
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
            if(data.status === 401) {
                Swal.fire({
                    title: "로그인",
                    text: "로그인을 먼저 해주세요.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "로그인하기",
                    cancelButtonText: "닫기",
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("/login");
                    }
                });
            } else if(data.status === 200) {
                dispatch(setTrilogParentCommentLike(id));
            } else {
                Swal.fire({
                    title: data.msg,
                    icon: "warning",
                });
            }
        })
        .catch(err => console.log(err, 'comment like'));
    };
};


const actionCreators = {
    getTrilogMain, // Trilog 메인 게시물 조회
    getTrilogMainFilter, // Trilog 메인 게시물 조회 - 필터 및 검색 적용시
    getTrilogMainMyPage, // Trilog 마이 페이지 게시물 조회 - 마이 페이지 내가 쓴 글 조회
    getTrilogMainMyPageLike, // Trilog 마이 페이지 게시물 조회 - 마이 페이지 내가 좋아요한 게시물 조회
    getTrilogDetail, // Trilog 게시물 상세 조회
    addTrilog, // Trilog 메인 게시물 등록
    removeTrilog, // Trilog 메인 게시물 삭제
    setLikeTrilog, // Trilog 메인 게시물 좋아요
    setLikeTrilogDetail, // Trilog 상세 게시물 좋아요
    getParentCommentScroll, // Trilog 상세 게시물 - 부모 댓글 더 보기
    addParentComment, // Trilog 상세 게시물 - 부모 댓글 추가
    editParentComment, // Trilog 상세 게시물 - 부모 댓글 수정
    removeParentComment, // Trilog 상세 게시물 - 부모 댓글 삭제
    setParentCommentLike, // Trilog 상세 게시물 - 부모 댓글 좋아요
};

export const { 
    setMainLoading, // Trilog 메인 페이지 - 내용 로딩 여부
    setDetailLoading, // Trilog 상세 페이지 - 내용 로딩 여부
    setTrilogMainAdd, // Trilog 메인 페이지 - 무한 스크롤 더 가져오기
    setTrilogMainEdit, // Trilog 수정 페이지 - 게시글 수정
    setTrilogMain, // Trilog 메인 페이지 - 게시글 조회
    setTrilogMainFilter, // Trilog 메인 페이지 - 필터 설정
    setTrilogMainPage, // Trilog 메인 페이지 - 무한 스크롤 페이지 설정(다음 게시물이 있나 없나)
    setTrilogLike, // Trilog 메인 페이지 - 게시글 좋아요
    removeTrilogDetail, // Trilog 상세 페이지 - 게시물 삭제
    setTrilogParentCommentPage, // Trilog 상세 페이지 - 부모 댓글 페이징 설정(다음 부모 댓글 있나 없나)
    setTrilogDetail, // Trilog 상세 페이지 - 해당 게시글 조회
    setTrilogParentComment, // Trilog 상세 페이지 - 부모 댓글 조회
    addTrilogParentCommentScroll, // Trilog 상세 페이지 - 부모 댓글 페이징(다음 부모 댓글 조회)
    editTrilogParentComment, // Trilog 상세 페이지 - 부모 댓글 수정
    removeTrilogParentComment, // Trilog 상세 페이지 - 부모 댓글 삭제
    setTrilogDetailLike, // Trilog 상세 페이지 - 게시글 좋아요
    addTrilogParentComment, // Trilog 상세 페이지 - 부모 댓글 작성
    setTrilogParentCommentLike, // Trilog 상세 페이지 - 부모 댓글 좋아요
} = trilogSlice.actions;
export default trilogSlice.reducer;
export { actionCreators };