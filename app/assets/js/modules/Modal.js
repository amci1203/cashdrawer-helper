import $ from 'jquery';

export default function Modal (name, content, isOpaque) {
    if (content) generateModal(name, content, isOpaque);

    const
        modal        = $(`#${name}`),
        openTrigger  = $(`.${name}--open`),
        closeTrigger = $(`.${name}--close, #${name} .close__button, #${name} .close`);


    return (() => {
        openTrigger.click(openModal);
        closeTrigger.click(closeModal);
        $(document).keyup(handleKeyPress);
        
        return { openModal, closeModal }
    })()



    function openModal ()  { modal.addClass('modal--open') }
    function closeModal () { modal.removeClass('modal--open')  }

    function handleKeyPress (key) {
        if (key.keyCode === 27) modal.removeClass('modal--open');
    }

    // modals are always appendeded to <body>
    // modalID & body is required
    function generateModal (modalId, content, isOpaque) {
        if ( !(modalId && content) ) return false;
        const frag = document.createDocumentFragment();
        const opacity = isOpaque ? 'modal__body--opaque' : 'transparent';
        const modal = create({
            tag: 'section',
            id: modalId,
            class: 'modal'
        });
        create({tag: 'span', class:'modal__close-button', html: 'X'}, modal)
        create({
            tag   : 'div',
            class : ['modal__body', opacity],
            html  : content
        }, modal)

        frag.appendChild(modal);
        document.body.appendChild(frag);

        function create (node, appendTo) {
            if (!node.tag) {
                console.log('No tag specified');
                return false;
            }
            const elm = document.createElement(node.tag);
            if (node.id) elm.id = node.id;
            if (node.html) elm.innerHTML = node.html;

            if (node.attr) {
                for (let attr in node.attr) {
                    elm.setAttribute(attr, node.attr[attr]);
                }
            }
            if (node.class) {
                if (typeof node.class == 'string') elm.classList.add(node.class);
                else  elm.classList.add(...node.class)
            }

            if (appendTo) appendTo.appendChild(elm)

            return elm;
        }
    }
}
