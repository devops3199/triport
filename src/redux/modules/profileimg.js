import { createSlice } from "@reduxjs/toolkit";

const profileimgSlice = createSlice({
  name: "profileimg",
  initialState: {
    user_img: "https://i.ibb.co/MDKhN7F/kakao-11.jpg",
  },
  reducers: {
    SET_PREVIEW: (state, action) => {
      state.user_img = action.payload;
    },
  },
});

// const updateProfileimg = (preview) => {
//   return function (dispatch) {
//     //프로필 이미지 수정했다면?
//     let formData = new FormData();
//     // 폼데이터로 저장
//     formData.append("file", img);
//     const img_data = {
//       url: "/api/upload/",
//       method: "POST",
//       data: formData,
//     };
//     axios(img_data)
//       .then((res) => {
//         dispatch(updateProfile(res.data, name, interest));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

export const { SET_PREVIEW } = profileimgSlice.actions;

export const reduxprofile = {};

export default profileimgSlice.reducer;
