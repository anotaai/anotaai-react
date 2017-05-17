export const UPDATE_PICTURE = 'update_picture';


export function updatePicture(pictureState) {
    return { type: UPDATE_PICTURE, pictureState};
}