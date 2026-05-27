export default function PhoneShell({ children }) {
  return (
    <div className="phone-stage">
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="status-bar">
            <span>9:41</span>
            <span className="status-right">
              <span>·oo</span>
              <span>5G</span>
              <span className="battery" />
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
