import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import "../index.css"

const loadCactusScript = callback => {
  const existingScript = window.initComments
  if (!existingScript) {
    const script = document.createElement("script")
    script.src = "https://latest.cactus.chat/cactus.js"
    script.id = "cactusComments"
    document.body.appendChild(script)
    script.onload = () => {
      if (callback) callback()
    }
  }
  if (existingScript && callback) callback()
}

const CactusComment = ({ path }) => {
  let commentID = path

  useEffect(() => {
    loadCactusScript(() => {
      window.initComments({
        node: document.getElementById("comment-section"),
        defaultHomeserverUrl: "https://matrix.cactus.chat:8448",
        serverName: "cactus.chat",
        siteName: "bbynetworkcomments",
        commentSectionId: commentID,
      })
    })
  }, [commentID])
  // why to return cactusOptions here
  // ref: https://stackoverflow.com/questions/61956823/why-cant-useeffect-access-my-state-variable-in-a-return-statement

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://latest.cactus.chat/style.css" media="print" onload="this.media='all'; this.onload = null"/>
      </Helmet>
      <div id="comment-section"></div>
    </>
  )
}

export const CommentsComponent = ({ commentid }) => {
  return (
    <>
        <h2 style={{fontWeight:"700"}}>Comments</h2>
        <CactusComment path={commentid} />
    </>
  )
}