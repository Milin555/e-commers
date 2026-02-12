import React from "react"
import PropTypes from "prop-types"

 const SectionHeading = ({ title }) => {
  return (
    <div className="flex flex-wrap  px-10 my-5 items-center gap-2">
        <div className="border rounded border-1 bg-black w-2 h-10"></div>
      <p className="text-3xl font-bold">{title}</p>
    </div>
  )
}

SectionHeading.defaultProps = {
  title: "Default Heading"
}

SectionHeading.propTypes = {
  title: PropTypes.string
}
export default SectionHeading