import React from 'react';
import { Outlet } from "react-router-dom";
import ConversationBar from '../Components/PageBars/ConversationBar/ConversationBar';
import MessageBar from '../Components/PageBars/MessageBar/MessageBar';


function PageAmenitiesTwo({
    newMessage, 
    setNewMessage,
    arrivalFlameMessage,
    arrivalUnionMessage,
}) {

  return (
    <>
        <div className="div-1-2">
            <ConversationBar
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                arrivalFlameMessage={arrivalFlameMessage}
                arrivalUnionMessage={arrivalUnionMessage}
            />
        </div> 
        <div className="div-1-2">
            <MessageBar        
                newMessage={newMessage}
                arrivalFlameMessage={arrivalFlameMessage}
                arrivalUnionMessage={arrivalUnionMessage}
            />
        </div>
        <Outlet /> 
    </>
  )
}

export default PageAmenitiesTwo;