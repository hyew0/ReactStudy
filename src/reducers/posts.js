/* const posts = (state=[], action) => {
    switch (action.type) {
        case 'FETCH_POST':
            return [...state, action.payload];
        default:
            return state;
    }
} */

const posts = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_POST':
            // 중복된 id를 제거한 새로운 상태 반환
            const newPosts = action.payload.filter(
                (newPost) => !state.some((post) => post.id === newPost.id)
            );
            return [...state, ...newPosts];
        default:
            return state;
    }
};

export default posts;