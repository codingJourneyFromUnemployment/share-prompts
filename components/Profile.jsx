import PromptCard from "@/components/PromptCard"


export function PromptCardList({ data, handleTagClick }) {
  return (
    <div className="mt-10 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

function Profile({ name, desc, data, handleTagClick }) {
  
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
        handleTagClick={handleTagClick}
        />
    </section>
  )
}

export default Profile