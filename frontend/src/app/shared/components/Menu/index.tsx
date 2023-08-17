import { useContext, useRef } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { ButtonSuccess } from '../ui/Buttons/ButtonSuccess'
import { ModalWindow } from '../ui/ModalWindow'

export const Menu = () => {
	const { signout } = useContext(AuthContext)
	const modalRef = useRef<any>(null)

	const handleModalOpen = () => {
		modalRef.current?.handleModalOpen()
	}

	return (
		<main className="flex flex-row justify-between border-b-2 border-solid h-full py-4 font-semibold">
			<div>
				<h1 className="ml-2 text-xl">Taskger</h1>
			</div>
			<div>
				<div className="flex mx-2 space-x-14 cursor-pointer">
					<p>Conta</p>
					<p
						className="hover:text-red-500 ease-in-out duration-200"
						onClick={handleModalOpen}
					>
						Sair
					</p>
				</div>
			</div>
			<ModalWindow
				ref={modalRef}
				contentLabel="Tem certeza que deseja sair?"
			>
				<main className="flex flex-col justify-between h-28 w-[400px] space-y-4">
					<h1>Tem certeza que deseja sair?</h1>
					<ButtonSuccess type="button" onClick={(event) => signout()}>
						Sim, sair
					</ButtonSuccess>
				</main>
			</ModalWindow>
		</main>
	)
}
