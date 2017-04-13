/* array shorthand [100s, 50s, 20s, 10s, 5s, 1s, quarters, dimes, nickels, pennies] */
/*
object form: {
 bills: {bill_value: amount}, // 100, 50, 20, 10, 5, 1
 coins: {coin_value: amount} // 25, 10, 5, 1
}

*/
import Modal from './Modal'


export default function Cashdrawer (_opening) {
	const
		formContainer       = document.getElementById('CD-form-container'),
		balanceContainer    = document.getElementById('CD-balance-container'),
		saleChangeContainer = document.getElementById('CD-modal-sale-container'),
		changeContainer     = document.getElementById('CD-modal-change-container');

	const balance = Array.isArray(_opening) ?
		{
            bills: {
                100 : _opening[0],
                50  : _opening[1],
                20  : _opening[2],
                10  : _opening[3],
                5   : _opening[4],
                1   : _opening[5]
            },
            coins: {
                25 : _opening[6],
                10 : _opening[7],
                5  : _opening[8],
                1  : _opening[9]
            }
		} : _opening
    ;

	balance.total = calculateBalanceTotal();
	balance.offBy = 0;

    const
        changeModal = Modal('change-modal', (`HEY`), true)

	return (() => {
		[createForm, createBalanceSheet].forEach(func => func())

        document.getElementById('cash-change').addEventListener('click', changeModal.openModal)
	})()



	function createForm () {
		const frag = document.createDocumentFragment();

        create({
            tag   : 'button',
            id    : 'cash-change',
            class : 'btn',
            html  : 'Change'
        }, frag)

        const form = create({
            tag  : 'form',
            id   : 'CD-form',
            attr : { action: ':javascript' }
        });

        create({
            tag: 'div',
            class: 'form-group-horizontal',
            html: `
                <span>Cash In</span>
                <input type='radio' name='transaction-type' id='cash-in' checked />
                <span>Cash Out</span>
                <input type='radio' name='transaction-type' id='cash-out' />
            `
        }, form)

        create({
            tag   : 'div',
            class : 'form-group-horizontal',
            html  : `
                <span id='tansaction-amount-text'>Ticket Price: $</span>
				<input type="number" min="0" id='ticket-price' />
            `
        }, form);

		for (let bill in balance.bills) {
            create({
                tag   : 'div',
                class : 'form-group',
                html  : `
                    <span>$${bill}</span>
					<input type="number" min='0' max='${balance.bills[bill]}' id='form-bills-${bill}' />
                `
            }, form)
		}

		for (let coin in balance.coins) {
			create({
                tag   : 'div',
                class : 'form-group',
                html  : `
                    <span>${coin}&cent;</span>
					<input type="number" min='0' max='${balance.coins[coin]}' id='form-coins-${coin}' />
                `
            }, form)
		}
		create({tag: 'h3', html: 'Short: $<span id="transaction-offset">0</span>'}, form)
		create({tag: 'button', class:['btn', 'btn--xlarge'], html: 'SUBMIT', attr: {type:'submit'}}, form)

		frag.appendChild(form);
		formContainer.appendChild(frag);
	}

	function createBalanceSheet () {
		const frag = document.createDocumentFragment();

        const list = document.createElement('ul')

        create({tag: 'li', class: 'list-sub-heading', html: 'Bills'}, list)
		for (let bill in balance.bills) {
            create({
                tag  : 'li',
                html : `$${bill}<span id='balance-bills-${bill}'>${balance.bills[bill]}</span>`
            }, list)
		}

        create({tag: 'li', class: 'list-sub-heading', html: 'Coins'}, list)
		for (let coin in balance.coins) {
			create({
                tag  : 'li',
                html : `${coin}&cent;<span id='balance-coins-${coin}'>${balance.coins[coin]}</span>`
            }, list)
		}

		frag.appendChild(list)
        create({tag: 'h4', html: 'TOTAL'}, frag);
        create({tag: 'p', html: `$<span id='balance-total'>${balance.total}</span>`}, frag);
        create({tag: 'p', html: 'OFF BY: $<span id="balance-offset" >0</span>'}, frag)

		balanceContainer.appendChild(frag);
	}

    function createModalForm () {
        const frag = document.createDocumentFragment();

        const form = create({
            tag  : 'form',
            id   : 'CD-form-change',
            attr : { action: ':javascript' }
        });


		for (let bill in balance.bills) {
            create({
                tag   : 'div',
                class : 'form-group',
                html  : `
                    <span>$${bill}</span>
					<input type="number" min='0' id='change-bills-${bill}' />
                `
            }, form)
		}

		for (let coin in balance.coins) {
			create({
                tag   : 'div',
                class : 'form-group',
                html  : `
                    <span>${coin}&cent;</span>
					<input type="number" min='0' id='change-coins-${coin}' />
                `
            }, form)
		}
		create({tag: 'h3', html: 'Short/Over: $<span id="transaction-offset"></span>'}, form)
		create({tag: 'button', class: 'btn', html: 'SUBMIT', attr: {type:'submit'}}, form)

		frag.appendChild(form);
		modalFormContainer.appendChild(frag);
    }

	function calculateBalanceTotal () {
		let total = 0;

		for (let bill in balance.bills) {
			total += (+bill * balance.bills[bill] * 100);
		}
		for (let coin in balance.coins) {
			total += (+coin * balance.coins[coin]);
		}

		return total / 100;
	}

    /*
        creates an element and adds any classes, id, and attributes specified
        takes the element's particulars in an object:
        { tag: String, id: String, class: [String], attr: {attribute: value}, html: String}
        appendTo *optional* should reference which element to appendTo after the node is formed
    */
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

	function change () {}

}
