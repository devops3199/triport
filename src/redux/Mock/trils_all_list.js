export const all_list = {
  ok: true,
  results: [
    {
      information: {
        id: 1,
        videoType: "mp4",
        videoUrl: "http://s3.soghoshg",
        posPlay: true,
        likeNum: 2,
        hashtag: ["속초", "회", "존맛탱"],
        createdAt: "2021-04-24 16:25",
      },
      author: {
        nickname: "user1@email.com",
        profileImgUrl: "http://15.165.205.40/profile/asdfasdf.png",
      },
      member: {
        isLike: true,
        isMembers: true,
      },
    },
    {
      information: {
        id: 2,
        videoType: "m3u8",
        videoUrl: "http://s3.soghoshg",
        posPlay: true,
        likeNum: 2,
        hashtag: ["일산", "호수공원", "벚꽃"],
        createdAt: "2021-04-24 16:25",
      },
      author: {
        nickname: "user1@email.com",
        profileImgUrl: "http://15.165.205.40/profile/asdfasdf.png",
      },
      member: {
        isLike: true,
        isMembers: true,
      },
    },
  ],
  last: true,
  msg: "모든 SNS를 조회하였습니다.",
};
