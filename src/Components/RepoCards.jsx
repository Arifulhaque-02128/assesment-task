import React from 'react'

const RepoCards = ({repos}) => {

  const filteredRepos = repos.slice(1,10);

//   console.log(filteredRepos)
  
  return (
    <div className='flex flex-wrap gap-2 m-4'>
        {
            filteredRepos.map((rep) => {
                return (
                    <div key={rep.id} className='flex flex-col p-4 bg-blue-50 rounded-md w-[300px] gap-4'>
                        <h1 className='text-2xl text-center font-semibold'> {rep.full_name} </h1>
                        {
                            rep.description && <p> <span className='font-semibold'> Description : </span> {rep.description} </p>
                        }
                        <p> <span className='font-semibold'> Language : </span> {rep.language} </p>
                        <p> <span className='font-semibold'> Forks : </span> {rep.forks} </p>
                        <p> <span className='font-semibold'> Stars : </span> {rep.stargazers_count} </p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default RepoCards