import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCommunity, deleteCommunity, fetchCommunity, fetchcommunityMembers, handleRemoveMember, joinCommunity, leaveCommunity } from '../../store/communitySlice'
import { useNavigate } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'

function Community() {
    const [community, setCommunity] = useState({
        name: '',
        description: '',
        file: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { Communities, communityMembers } = useSelector((state) => ({
        Communities: state.community.Communities,
        communityMembers: state.community.communityMembers
    }))

    console.log(communityMembers);


    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', community.name)
        formData.append('description', community.description)
        formData.append('file', community.file)

        dispatch(addCommunity(formData))
    }

    useEffect(() => {
        dispatch(fetchCommunity())
        dispatch(fetchcommunityMembers())
    }, [dispatch])

    const handleImageChange = (e) => {
        setCommunity({
            ...community,
            [e.target.name]: e.target.files[0]
        })
    }
    const handleChange = (e) => {
        setCommunity({
            ...community,
            [e.target.name]: e.target.value
        })
    }

    const id = localStorage.getItem('id')

    // const alreadymember = communityMembers.some(c => c.userId === id)

    // console.log(alreadymember);

    const [selectedCommunity, setSelectedCommunity] = useState();

    console.log(selectedCommunity);

    const communitySeting = (commu) => {
        console.log(commu);

        setSelectedCommunity(commu)
        console.log(selectedCommunity)
    }

    return (
        <div className="container " style={{ minHeight: '90vh', marginTop: '100px' }}>
            <>
                <h2 className="mb-4">Create New Community</h2>
                <div className="card mb-5">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Community Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={community.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={community.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Community Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="file"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Create Community</button>
                        </form>
                    </div>
                </div>
                <div className="modal fade" id="manageMembersModal" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Community Members</h5>
                                <button type="button" className="btn-close" ></button>
                            </div>
                            <div className="modal-body">
                                <ul className="list-group">
                                    {communityMembers?.filter(member => member.communityId === selectedCommunity?._id)
                                        .map(member => (
                                            <li key={member._id} className="list-group-item d-flex justify-content-between align-items-center">
                                                {selectedCommunity?.admin !== member.userId._id && member.userId.name}
                                                {selectedCommunity?.admin !== member.userId._id && <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => dispatch(handleRemoveMember({ membId: member.userId._id, commuId: member.communityId }))}
                                                >
                                                    Remove
                                                </button>}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="mb-4">Available Communities</h2>
                <div className="row">
                    {Communities?.map(comm => (
                        <div key={comm._id} className="col-md-4 mb-4">
                            <div className="card" style={{ cursor: 'pointer' }}>
                                <img src={${BASE_URL}${comm.file}`}
                                    onClick={() => {
                                        if (communityMembers?.some((member) => member.communityId === comm._id && member.userId._id === id) || comm.admin === id) {
                                            navigate(`/communityActivity/${comm._id}`)
                                        }
                                    }}
                                    className="card-img-top" style={{ height: 200, objectFit: 'cover' }} alt={comm.name} />
                                <div className="card-body">
                                    <div className='' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h5 className="card-title">{comm.name}</h5>
                                        <h6>{communityMembers?.filter(member => member.communityId === comm._id).length + (comm.admin ? 1 : 0)} members</h6>
                                    </div>
                                    <p className="card-text">{comm.description}</p>
                                    <div style={{ display: 'flex', gap: 3 }}>
                                        {comm.admin === id && <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#manageMembersModal" onClick={() => communitySeting(comm)}>Manage Community</button>}
                                        {comm.admin === id && <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); dispatch(deleteCommunity(comm._id)) }}>Delete Community</button>}
                                        {comm.admin !== id && communityMembers?.some((member) => member.communityId === comm._id && member.userId._id === id) ?
                                            <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); dispatch(leaveCommunity(comm._id)) }}>Leave Community</button> :
                                            comm.admin !== id && <button className="btn btn-primary mr-3" onClick={(e) => { e.stopPropagation(); dispatch(joinCommunity(comm._id)) }}>Join Community</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>

        </div>
    )
}

export default Community
