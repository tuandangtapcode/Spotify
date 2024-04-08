import { Button, } from "antd"
import { AiOutlineLeft } from "react-icons/ai"

const AfterFirstStep = ({ current, setCurrent, step, title, children }) => {
  return (
    <>
      <div className="align-items-center m-auto mb-30" style={{ width: '400px' }}>
        <div className="mr-20">
          <Button
            className="icon-back text-gray fs-25"
            onClick={() => setCurrent(current - 1)}
            icon={<AiOutlineLeft />}
          />
        </div>
        <div className="d-flex flex-column align-items-flex-start">
          <p className="fs-16 fw-500 text-gray">Bước {step}/3</p>
          <p className="fs-16 fw-600 text">{title}</p>
        </div>
      </div>

      <div style={{ width: '300px', height: '100%' }} className="m-auto d-flex flex-column justify-content-space-between">
        {children}
      </div>
    </>
  )
}

export default AfterFirstStep