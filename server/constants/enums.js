/*
    Enums are not supported in JavaScript natively. We can however create Enums using Object.freeze 
    by creating objects containing all the enumerable properties and then freezing the object so that 
    no new enum can be added to it.
*/
const VideoType = {
    MUSIC: "Music",
    MOVIE: "Movie",
    DRAMA: "Drama",
    COMEDY: "Comedy",
    SPORT: "Sport",
    NEWS: "News",
    GAMING: "Gaming",
    FASHION_AND_BEAUTY: "Fashion and Beauty",
    LEARNING: "Learning",
    SCIENCE_AND_TECHNOLOGY: "Fashion and Technology",
    COOKING: "Cooking",
    TRAVEL_VLOG: "Travel vlog",
    FOOD_VLOG: "Food vlog"
}  

const PlaylistType = {
    USER_PLAYLIST: "User Playlist",
    CHANNEL_PLAYLIST: "Channel Playlist"
}

Object.freeze(VideoType)
Object.freeze(PlaylistType)

export {
    VideoType,
    PlaylistType
}