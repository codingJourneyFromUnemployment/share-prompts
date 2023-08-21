import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center ">
      <h1 className="head_text text-center my-2">
        Discover & Share
      </h1>
      <span className="orange_gradient text-center head_text">AI-Powered Prompts</span>
      <p className="desc text-center my-2">
        Share-Prompts is a community of writers who share and discover AI-generated prompts.
      </p>
      <Feed/>
    </section>
  )
}

export default Home