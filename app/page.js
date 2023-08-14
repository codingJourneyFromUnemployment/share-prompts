import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center space-y-2">
      <h1 className="head_text text-center">
        Discover & Share
      </h1>
      <span className="orange_gradient text-center head_text">AI-Powered Prompts</span>
      <p className="desc text-center">
        Share-Prompts is a community of writers who share and discover AI-generated prompts.
      </p>
      <Feed />
    </section>
    //<Feed />
  )
}

export default Home