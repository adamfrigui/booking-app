import './MailList.scss'

const MailList = () => {
  return (
    <div className="mail">
        <h1 className="mailTitle">Save time,save money!</h1>
        <span className='mailDesc'>sign up and we'll send the best deals to you</span>
        <div className="mailInputContainer">
             <input type="text"  placeholder='Email...'/>
             <button>subscribe</button>
        </div>
    </div>
  )
}

export default MailList