<script>
	// imports
	import {
		// @ts-ignore
		Table,
		Checkbox,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Button,
		Modal,
		Label,
		Input,
		ButtonGroup
	} from 'flowbite-svelte';
	import { PlusSolid, ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// extra CSS
	let divClass = 'bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden';
	let innerDivClass =
		'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
	let searchClass = 'w-full md:w-1/2 relative';
	let svgDivClass = 'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none';
	let classInput =
		'text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10';

	// Players placeholder data
	let players = [
		{ id: 1, name: 'Player 1', alias: 'Camjkz', rating: 2000, rd: 350, vol: 0.06 },
		{ id: 2, name: 'Player 2', alias: 'Hector', rating: 1500, rd: 320, vol: 0.06 },
		{ id: 3, name: 'Player 3', alias: 'Sikey', rating: 1800, rd: 130, vol: 0.06 },
		{ id: 4, name: 'Player 4', alias: 'Zebraboi', rating: 1900, rd: 210, vol: 0.06 },
		{ id: 5, name: 'Player 5', alias: 'BlacknotWhite', rating: 1230, rd: 400, vol: 0.06 },
		{ id: 6, name: 'Player 6', alias: 'ZXgei', rating: 1760, rd: 500, vol: 0.06 },
		{ id: 7, name: 'Player 7', alias: '4Germany', rating: 1100, rd: 100, vol: 0.06 },
		{ id: 8, name: 'Player 8', alias: 'Cousin', rating: 800, rd: 90, vol: 0.06 },
		{ id: 9, name: 'Player 9', alias: 'PepePondo', rating: 1100, rd: 100, vol: 0.06 },
		{ id: 10, name: 'Player 10', alias: 'urMum', rating: 1200, rd: 200, vol: 0.06 },
		{ id: 11, name: 'Player 11', alias: 'Armada', rating: 2200, rd: 230, vol: 0.06 },
		{ id: 12, name: 'Player 12', alias: 'Tights2901', rating: 1700, rd: 250, vol: 0.06 },
		{ id: 13, name: 'Player 13', alias: 'Bbas', rating: 1210, rd: 230, vol: 0.06 },
		{ id: 14, name: 'Player 14', alias: 'Leeryo', rating: 1900, rd: 340, vol: 0.06 },
		{ id: 15, name: 'Player 15', alias: 'mummy', rating: 1700, rd: 250, vol: 0.06 },
		{ id: 16, name: 'Player 16', alias: 'AllIWantIsCode', rating: 1210, rd: 230, vol: 0.06 },
		{ id: 17, name: 'Player 17', alias: 'Eeeshsdfs', rating: 1900, rd: 340, vol: 0.06 }
	];

	// variables
	let wasClicked = false;
	let searchTerm = '';
	let currentPosition = 0;
	const itemsPerPage = 7;
	const showPage = 1;
	let totalPages = 0;
	/**
	 * @type {any[]}
	 */
	let pagesToShow = [];
	let totalItems = players.length;
	/**
	 * @type {number}
	 */
	let startPage;
	/**
	 * @type {number}
	 */
	let endPage;
	// sorting variables
	const sortKey = writable('id'); // default sort key
	const sortDirection = writable(1); // default sort direction (ascending)
	const sortItems = writable(players.slice()); // make a copy of the players array

	// Pagination functions
	const updateDataAndPagination = () => {
		const currentPageItems = players.slice(currentPosition, currentPosition + itemsPerPage);
		renderPagination(currentPageItems.length);
	};

	const loadNextPage = () => {
		if (currentPosition + itemsPerPage < players.length) {
			currentPosition += itemsPerPage;
			updateDataAndPagination();
		}
	};

	const loadPreviousPage = () => {
		if (currentPosition - itemsPerPage >= 0) {
			currentPosition -= itemsPerPage;
			updateDataAndPagination();
		}
	};

	const renderPagination = (/** @type {number} */ totalItems) => {
		totalPages = Math.ceil(players.length / itemsPerPage);
		const currentPage = Math.ceil((currentPosition + 1) / itemsPerPage);

		startPage = currentPage - Math.floor(showPage / 2);
		startPage = Math.max(1, startPage);
		endPage = Math.min(startPage + showPage - 1, totalPages);

		pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	};

	const goToPage = (/** @type {number} */ pageNumber) => {
		currentPosition = (pageNumber - 1) * itemsPerPage;
		updateDataAndPagination();
	};

	// Pagination svelte variables
	$: startRange = currentPosition + 1;
	$: endRange = Math.min(currentPosition + itemsPerPage, totalItems);

	onMount(() => {
		// Call renderPagination function when the component is mounted
		renderPagination(players.length);
	});

	$: currentPageItems = players.slice(currentPosition, currentPosition + itemsPerPage);

	$: filteredItems = players.filter(
		(player) =>
			player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			player.alias.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Define a function to sort the players
	const sortTable = (/** @type {any} */ key) => {
		// If the same key is clicked, reverse the sort direction
		if ($sortKey === key) {
			sortDirection.update((val) => -val);
		} else {
			sortKey.set(key);
			sortDirection.set(1);
		}
	};

	// @ts-ignore
	$: {
		const key = $sortKey;
		const direction = $sortDirection;
		const sorted = [...$sortItems].sort((a, b) => {
			// @ts-ignore
			const aVal = a[key];
			// @ts-ignore
			const bVal = b[key];
			if (aVal < bVal) {
				return -direction;
			} else if (aVal > bVal) {
				return direction;
			}
			return 0;
		});
		sortItems.set(sorted);
	}

	// Add player modal
	let defaultModal = false;
	const handleSubmit = () => {
		alert('Form submited.');
	};
	/**
	 * @type {any}
	 */
	let selected;
</script>

<!-- Player Table -->
<div class="container mx-auto px-1 py-4">
	<TableSearch
		placeholder="Search by player name or alias"
		hoverable={true}
		bind:inputValue={searchTerm}
		{divClass}
		{innerDivClass}
		{searchClass}
		{classInput}
		striped={true}
		shadow={true}
		class="bg-white"
	>
		<div
			slot="header"
			class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
		>
			<Button on:click={() => (defaultModal = true)}>
				<PlusSolid class="h-3.5 w-3.5 mr-2" />
				Add player
			</Button>
		</div>
		<TableHead>
			<TableHeadCell class="!p-4 bg-white">
				<Checkbox />
			</TableHeadCell>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('id')}>ID</TableHeadCell>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('rating')}
				>Rating</TableHeadCell
			>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('name')}>Name</TableHeadCell>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('alias')}>Alias</TableHeadCell
			>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('rd')}
				>Rating Deviation</TableHeadCell
			>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('vol')}
				>Volatility</TableHeadCell
			>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#if searchTerm !== ''}
				{#each filteredItems as item (item.id)}
					<TableBodyRow>
						<TableHeadCell class="!p-4">
							<Checkbox />
						</TableHeadCell>
						<TableBodyCell tdClass="px-6 py-3">{item.id}</TableBodyCell>
						<TableBodyCell tdClass="px-6 py-3">{item.name}</TableBodyCell>
						<TableBodyCell tdClass="px-6 py-3">{item.alias}</TableBodyCell>
						<TableBodyCell tdClass="px-6 py-3">{item.rd}</TableBodyCell>
						<TableBodyCell tdClass="px-6 py-3">{item.vol}</TableBodyCell>
						<TableBodyCell tdClass="px-6 py-3">{item.rating}</TableBodyCell>
					</TableBodyRow>
				{/each}
			{:else}
				{#each currentPageItems as item (item.id)}
					<TableBodyRow>
						<TableHeadCell class="!p-4">
							<Checkbox />
						</TableHeadCell>
						<TableBodyCell tdClass="px-6 py-3">{item.id}</TableBodyCell>
						<TableBodyCell tdClass="px-6 py-3">{item.rating}</TableBodyCell>
						<TableBodyCell tdClass="px-6 py-3">{item.name}</TableBodyCell>
						<TableBodyCell tdClass="px-6 py-3">{item.alias}</TableBodyCell>
						<TableBodyCell tdClass="px-6 py-3">{item.rd}</TableBodyCell>
						<TableBodyCell tdClass="px-6 py-3">{item.vol}</TableBodyCell>
					</TableBodyRow>
				{/each}
			{/if}
		</TableBody>
		<div
			slot="footer"
			class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
			aria-label="Table navigation"
		>
			<span class="text-sm font-normal text-gray-500 dark:text-gray-400">
				Showing
				<span class="font-semibold text-gray-900 dark:text-white">{startRange}-{endRange}</span>
				of
				<span class="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
			</span>
			<ButtonGroup>
				<Button on:click={loadPreviousPage} disabled={currentPosition === 0}
					><ChevronLeftOutline size="xs" class="m-1.5" /></Button
				>
				{#each pagesToShow as pageNumber}
					<Button on:click={() => goToPage(pageNumber)}>{pageNumber}</Button>
				{/each}
				<Button on:click={loadNextPage} disabled={totalPages === endPage}
					><ChevronRightOutline size="xs" class="m-1.5" /></Button
				>
			</ButtonGroup>
		</div>
	</TableSearch>
</div>

<!-- Comparison Modal -->
<Modal title="Add Product" bind:open={defaultModal} autoclose class="min-w-full">
	<form on:submit={handleSubmit}>
		<div class="grid gap-4 mb-4 sm:grid-cols-2">
			<div>
				<Label for="name" class="mb-2">Name</Label>
				<Input type="text" id="name" placeholder="Type participant name" required />
			</div>
			<div>
				<Label for="alias" class="mb-2">Alias</Label>
				<Input type="text" id="alias" placeholder="Type participant alias" required />
			</div>
			<div>
				<Label for="rating">Predicted Rating (optional)</Label>
				<span class="text-xs italic font-thin">Rating should be between 800 to 2000 to start.</span>
				<Input type="text" id="rating" class="mt-1" placeholder="Default rating is 1500" />
			</div>
			<div />
			<Button type="submit" class="w-52">
				<svg
					class="mr-1 -ml-1 w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
						clip-rule="evenodd"
					/></svg
				>
				Add new player
			</Button>
		</div>
	</form>
</Modal>
