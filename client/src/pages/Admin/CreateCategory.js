import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import CategoryForm from './../../components/Form/CategoryForm'
import { Modal } from 'antd'
import './CreateCategory.css'
import toast from 'react-hot-toast'
import axios from 'axios'

const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState('')

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category')
      if (data?.success) setCategories(data?.category)
    } catch {
      toast.error('Failed to load categories')
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  // Create category
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return toast.error('Category name required')

    try {
      const { data } = await axios.post('/api/v1/category/create-category', { name })
      if (data?.success) {
        toast.success('Category created')
        setName('')
        getAllCategory()
      }
    } catch {
      toast.error('Create failed')
    }
  }

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!updatedName.trim() || !selected) return
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      )
      if (data?.success) {
        toast.success('Category updated')
        setVisible(false)
        setUpdatedName('')
        setSelected(null)
        getAllCategory()
      }
    } catch {
      toast.error('Update failed')
    }
  }

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`)
      if (data?.success) {
        toast.success('Category deleted')
        getAllCategory()
      }
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <Layout title="Dashboard - Category">
      <div className="createCategory container-fluid px-3 py-3">
        <div className="row justify-content-center">

          {/* Sidebar */}
          <div className="col-12 col-md-3 admin-sidebar">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-9">
            <div className="glass-card">

              <h2 className="mb-4 text-info">Manage Categories</h2>

              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />

              <div className="table-responsive mt-4">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th className="text-warning">Name</th>
                      <th className="text-warning" style={{ width: '160px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length ? (
                      categories.map((c, idx) => (
                        <tr key={c._id} className={idx % 2 === 0 ? 'table-primary' : 'table-secondary'}>
                          <td>{c.name}</td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm me-2"
                              onClick={() => {
                                setVisible(true)
                                setUpdatedName(c.name)
                                setSelected(c)
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(c._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center text-muted">
                          No categories found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Modal
                open={visible}
                footer={null}
                onCancel={() => setVisible(false)}
              >
                <CategoryForm
                  handleSubmit={handleUpdate}
                  value={updatedName}
                  setValue={setUpdatedName}
                />
              </Modal>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory

