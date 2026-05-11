export default function About({params}:{
        params : {reviewId:string};
}) {

      return (<h1>Details about review nr {params.reviewId}</h1>);
}