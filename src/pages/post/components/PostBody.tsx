
interface IProps{
    postBody:string
}
const PostBody = (props:IProps) => {
    const{postBody}=props

    return (
        <div className={`text-justify `}
             dangerouslySetInnerHTML={{__html: postBody}}/>
    );
};

export default PostBody;
