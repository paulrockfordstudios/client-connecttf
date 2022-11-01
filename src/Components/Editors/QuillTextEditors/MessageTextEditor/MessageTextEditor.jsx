import React, { useEffect, useRef,  useState, memo } from 'react';
import { useQuill } from 'react-quilljs';
import { useSelector } from 'react-redux';
import axios from "axios";
import { formats } from "../../../../Utils/TextEditorToolbar";
import { Linkify } from 'quill-linkify';
import Emoji from "quill-emoji";
import "quill-emoji/dist/quill-emoji.css";
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import Mention from "quill-mention";
import "quill-mention/dist/quill.mention.css";
import './MessageTextEditor.css';
//import {parse, stringify, toJSON, fromJSON} from 'flatted';


const MessageTextEditor = ({ value, editorType, setValue, toolbar=false, focusRef, readOnly=false, ph, cBox }) => {

    const { user, mentions } = useSelector((state) => state.auth);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [tmpValue, setTmpValue] = useState(value ? value : "")
    const [mentionArr, setMentionArr] = useState(mentions);
    
    useEffect(() => {
        if(tmpValue) {
            setValue(tmpValue);
        }
    }, [tmpValue]);

    const emojiBtn = `<img id="emojiIconBtn${cBox ? cBox : ""}" class="emojiPNGIcon" src="/icons/emoji/emoji.png" alt="" />`

    
    const higherSpectrumBoxShadow = () => {
        if (user.unionName && 
            user.spectrum === "rainbow" ||
            user.spectrum === "silver" ||
            user.spectrum === "gold" ||
            user.spectrum === "platinum" ||
            user.spectrum === "diamond") {
            const contElem = document.getElementById("quill-mention-list-container");
            contElem?.classList.add("highSpectrum");
            const listElem = document.getElementById("quill-mention-list");
            listElem.classList.add("highSpectrum");
            const bsImg = document.createElement("img");
            bsImg.setAttribute("id", "bsIMG");
            bsImg.classList.add("mentionContainerBoxShadow");
            bsImg.src = `/misc/${user.spectrum}-background.jpg`;
            const bsDiv = document.createElement("div");
            bsDiv.setAttribute("id", "bsDiv");
            bsDiv.classList.add("mentionContainerWhiteBackground");
            const elem = document.getElementsByClassName("ql-mention-list-container");
            for (var i = 0; i < elem.length; i++) {
                const idBsImg = document.getElementById("bsImg");
                const idBsDiv = document.getElementById("bsDiv");
                if (!idBsImg && !idBsDiv) {
                    elem.item(i).appendChild(bsDiv);
                    elem.item(i).appendChild(bsImg);
                }
            }
        }
    };

    
    useEffect(() => {
        setMentionArr(mentions.filter((obj) => !tmpValue.includes(obj.id)));
    }, [tmpValue])


    async function suggestPeople(searchTerm) {
        return mentionArr.filter(person => person.value.includes(searchTerm));
    }


    const changeMentionInsertColor = () => {
        var elem = document.getElementsByClassName("mention");
        for (var i = 0; i < elem.length; i++) {
            elem.item(i).classList.add(`${elem.item(i).dataset.color}`)
        }
    };
   

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: [] }],
    
        [{ list: 'ordered'}, { list: 'bullet' }],
        [{ indent: '-1'}, { indent: '+1' }],
    
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image', 'video', "emoji"],
        [
            { color: [ 
                "#4a76fd", "#d8e1fe", "#c3cbe5", "#3453b2", 
                "#e639af", "#fde1ef", "#e4cbd8", "#a1287b", 
                "#850014", "#d4a6ad", "#be959b", "#5d000e",
                "#ff8303", "#ffdab3", "#e6c5a1", "#b35c02",
                "#ffe700", "#fff9bf", "#e6e1ac", "#b3a200",
                "#50c878", "#caeed6", "#b6d7c1", "#388c54",
                "#098de9", "#cee8fb", "#bad1e2", "#0663a4",
                "#30307e", "#babad4", "#a8a8bf", "#222258",
                "#8a2be2", "#dcbff6", "#c6acde", "#611e9f",
                "#aeb4b7", "#e4e6e7", "#cecfd0", "#7a7e80",
                "#00000",  "#fff",
            ] }, 
            { background: [
                "#4a76fd", "#d8e1fe", "#c3cbe5", "#3453b2", 
                "#e639af", "#fde1ef", "#e4cbd8", "#a1287b", 
                "#850014", "#d4a6ad", "#be959b", "#5d000e",
                "#ff8303", "#ffdab3", "#e6c5a1", "#b35c02",
                "#ffe700", "#fff9bf", "#e6e1ac", "#b3a200",
                "#50c878", "#caeed6", "#b6d7c1", "#388c54",
                "#098de9", "#cee8fb", "#bad1e2", "#0663a4",
                "#30307e", "#babad4", "#a8a8bf", "#222258",
                "#8a2be2", "#dcbff6", "#c6acde", "#611e9f",
                "#aeb4b7", "#e4e6e7", "#cecfd0", "#7a7e80",
                "#fff", "transparent",
            ] }
        ],
        ['clean'],
    ];

    
    const modules = { 
        blotFormatter: {},
        /*mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ["@"],
            dataAttributes: ["id", "value", "profileName", "color", "denotationChar", "link"],
            minChars: 1,
            spaceAfterInsert: false,
            onOpen() {
                if (user.unionName) {
                    return higherSpectrumBoxShadow();
                }
            },
            mentionContainerClass: `ql-mention-list-container BOX_SHADOW ${user?.unionName ? user?.spectrum : user?.energy}`,
            source: async function (searchTerm, renderList) {
                const matchedPeople = await suggestPeople(searchTerm);
                renderList(matchedPeople);
            },
            renderItem: (item) => {
                if (item.color === "diamond") {
                    return (
                        `<div id="${item.id}" class="mentionItem ${item.color}">
                            <div class="mentionItem img front ${item.color}"/>
                            <img class="mentionItem img behind ${item.color}" src="/misc/dmd-bkgd-ment-hov.jpg" alt="" />
                            ${item.avatar + item.icon}
                            <span class="mentionText ${item.color}">${item.value}</span>
                        </div>`
                    )
                }
                return (                    
                    `<div id="${item.id}" class="mentionItem ${item.color}" >
                        ${item.avatar + item.icon + item.value}
                    </div>`
                );
            },
        },*/
        toolbar: toolbar ? {
            container: toolbarOptions,
        } : null,
        "emoji-toolbar": true,
        "emoji-textarea": {buttonIcon: emojiBtn},
        "emoji-shortname": false,
        clipboard: {
            matchVisual: false,
        },
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true
        },
        linkify: {
            url: /(https?:\/\/|www\.)[\w-\.]+\.[\w-\.]+(\/([\S]+)?)?/i,
            mail: /([\w-\.]+@[\w-\.]+\.[\w-\.]+)/i, 
            phoneNumber:
                /(((0(\d{1}[-(]?\d{4}|\d{2}[-(]?\d{3}|\d{3}[-(]?\d{2}|\d{4}[-(]?\d{1}|[5789]0[-(]?\d{4})[-)]?)|\d{1,4}-?)\d{4}|0120[-(]?\d{3}[-)]?\d{3})/i,
        },
    };
    
    const { quill, quillRef, Quill } = useQuill({
        
        readOnly,
        formats,
        modules,
    });

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async function() {
            const file = input.files[0];
            const data = new FormData();
            const fileName = Date.now() + file.name;            
            data.append("name", fileName);
            data.append("file", file);
            const res = await axios.post("/upload", data);
            const range = quill.getSelection();
            const link = `${PF + res.data.name}`;
            quill.insertEmbed(range.index, 'image', `${PF + fileName}`); 
        }
    };

    
    useEffect(() => {
        if(quill && value) {
            quill.clipboard.dangerouslyPasteHTML(value);
        }
    }, [quill]);


    useEffect(() => {
        if (quill && toolbar) {
            quill.getModule('toolbar').addHandler('image', () => {imageHandler()});   
        }
    }, [quill]);

    
    if (Quill && !quill) {
        Quill.register('modules/blotFormatter', BlotFormatter);
        Quill.register('modules/linkify', Linkify);
        Quill.register(
            {
            "formats/emoji": Emoji.EmojiBlot,
            "modules/emoji-toolbar": Emoji.ToolbarEmoji,
            "modules/emoji-textarea": Emoji.TextAreaEmoji,
            "modules/emoji-shortname": Emoji.ShortNameEmoji
            },
            true
        );
    };
       

    useEffect(() => {
        if (quill) {
            
            quill.on('text-change', (contents, delta, oldContents) => {
                changeMentionInsertColor();
                setTmpValue(quill.root.innerHTML);
            });
        }
    }, [quill]);

    
    return (
        <div className="quillTextEditorContainer" ref={focusRef}>
            <div className="quillEditor" ref={quillRef} />
            {tmpValue === null || tmpValue === "" || tmpValue === "<p><br></p>" 
                ? <span className="quillTextEditorPlaceholder">{ph}</span>
                : null
            }
        </div>
    );
};

export default MessageTextEditor;
