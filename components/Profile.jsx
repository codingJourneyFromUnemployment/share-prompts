import PromptCard from "@/components/PromptCard"


export function PromptCardList({ data }) {
  return (
    <div className="mt-10 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
        />
      ))}
    </div>
  )
}

function Profile({ name, desc, data }) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name} Profile
        </span>
      </h1>
      <p className="desc text-left">
        {desc}
      </p>

      <PromptCardList 
        data={data}
        />
    </section>
  )
}

export default Profile