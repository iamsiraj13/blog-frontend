import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { images } from "../../contstant";
import BreadCrumbs from "../../components/BreadCrumbs";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentsContainer from "../../components/Comment/CommentsContainer";

const ArticleDetailPage = () => {
  const postsData = [
    {
      _id: 2,
      title: "post title is here",
    },
  ];

  const tagdata = ["numaric", "musical"];
  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs />
          {/* <img
            className="rounded-xl w-full"
            src={
              data?.photo
                ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                : images.samplePostImage
            }
            alt={data?.title}
          /> */}
          <img className="rounded-xl w-full" src={images.Post1Image} alt="" />
          <div className="mt-4 flex gap-2">
            {/* {data?.categories.map((category) => ( */}
            {[1, 2, 3, 4, 5].map((category, index) => (
              <Link
                key={index}
                to="/"
                // to={`/blog?category=${category.name}`}
                className="text-primary text-sm font-roboto inline-block md:text-base"
              >
                {/* {category.name} */}
                hello
              </Link>
            ))}
          </div>
          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            {/* {data?.title} */}
            this is blog title
          </h1>
          <div className="w-full">
            {/* {!isLoading && !isError && (
              <Editor content={data?.body} editable={false} />
            )} */}
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              eos, suscipit facere perferendis sunt beatae aut autem nisi labore
              iure voluptate quam sint, ex dolorum neque laborum, perspiciatis
              aliquam. Itaque provident placeat quae est praesentium molestias
              soluta voluptatem, fugit maxime ea ut reprehenderit doloremque
              architecto atque hic dolorem accusantium? Commodi officia adipisci
              blanditiis perspiciatis tenetur. Reiciendis eius cum, mollitia,
              veritatis libero exercitationem sint vel maxime ipsam vero totam
              consequuntur, commodi laborum consectetur expedita nostrum nihil
              pariatur aperiam atque quidem saepe necessitatibus rerum? Nisi,
              ipsum ab eligendi dolores doloremque dolore culpa. Provident
              dolorum alias incidunt praesentium ut perferendis enim error
              accusantium?
            </p>
          </div>
          {/* <CommentsContainer
            comments={data?.comments}
            className="mt-10"
            logginedUserId={userState?.userInfo?._id}
            postSlug={slug}
          /> */}
          <CommentsContainer className="mt-10" logginedUserId="a" />
        </article>
        <div>
          <SuggestedPosts
            header="Latest Article"
            posts={postsData}
            tags={tagdata}
            className="mt-8 lg:mt-0 lg:max-w-xs"
          />
          <div className="mt-7">
            <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
              Share on:
            </h2>
            {/* <SocialShareButtons
              url={encodeURI(window.location.href)}
              title={encodeURIComponent(data?.title)}
            /> */}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ArticleDetailPage;
