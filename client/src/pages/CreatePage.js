import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/htttp.hook";
const CreatePage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { request } = useHttp()
  const [link, setLink] = useState('');

  const handlePress = async (event) => {
    if (event.key === 'Enter') {
      const data = await request('api/links/generate', "POST", { from: link }, { Authorization: `Bearer ${token}` });
      navigate(`/detail/${data.link._id}`)
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input
            id="link"
            type="email"
            className="validate"
            onChange={({ target }) => setLink(target.value)}
            name="link"
            value={link}
            onKeyPress={handlePress}
          />
          <label htmlFor="email">input a link</label>
        </div>
      </div>
    </div>
  )
}

export default CreatePage;