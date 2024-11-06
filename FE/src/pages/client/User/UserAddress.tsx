import React from 'react'


const UserAddress = () => {
  return (
    <div>
        <section>
    <h1 className="text-3xl font-bold mb-6">Địa Chỉ Của Tôi</h1>
    <form className="bg-white p-6 rounded shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address fields go here */}
      </div>
      <button type="submit" className="btn btn-primary mt-6">
        Lưu Địa Chỉ
      </button>
    </form>
  </section>
    </div>
  )
}

export default UserAddress