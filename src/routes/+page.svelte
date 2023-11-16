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
		Input
	} from 'flowbite-svelte';
	import { PlusSolid } from 'flowbite-svelte-icons';
	import { writable } from 'svelte/store';

	// extra CSS
	let divClass = 'bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden';
	let innerDivClass =
		'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
	let searchClass = 'w-full md:w-1/2 relative';
	let svgDivClass = 'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none';
	let classInput =
		'text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10';

	// search box & placeholder player data
	let searchTerm = '';
	let players = [
		{ id: 1, name: 'Player 1', alias: 'Camjkz', rating: 2000, rd: 350, vol: 0.06 },
		{ id: 2, name: 'Player 2', alias: 'Hector', rating: 1500, rd: 320, vol: 0.06 },
		{ id: 3, name: 'Player 3', alias: 'Sikey', rating: 1800, rd: 130, vol: 0.06 },
		{ id: 4, name: 'Player 4', alias: 'Zebraboi', rating: 1900, rd: 200, vol: 0.06 }
	];
	$: filteredItems = players.filter(
		(player) =>
			player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			player.alias.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// sorting variables
	const sortKey = writable('id'); // default sort key
	const sortDirection = writable(1); // default sort direction (ascending)
	const sortItems = writable(players.slice()); // make a copy of the players array

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
			<Button>
				<PlusSolid class="h-3.5 w-3.5 mr-2" /><a
					href="javascript:void(0);"
					on:click={() => (defaultModal = true)}>Add player</a
				>
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
			{#each filteredItems as item}
				<TableBodyRow>
					<TableHeadCell class="!p-4">
						<Checkbox />
					</TableHeadCell>
					<TableBodyCell>{item.id}</TableBodyCell>
					<TableBodyCell>{item.rating}</TableBodyCell>
					<TableBodyCell>{item.name}</TableBodyCell>
					<TableBodyCell>{item.alias}</TableBodyCell>
					<TableBodyCell>{item.rd}</TableBodyCell>
					<TableBodyCell>{item.vol}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
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
