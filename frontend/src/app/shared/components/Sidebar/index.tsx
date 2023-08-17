import { useEffect, useState } from 'react';
import { CreateNewCategory } from '../Categories/CreateNewCategory';
import { api } from '../../services/apiClient';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { toast } from 'react-hot-toast';

interface ISidebarProps {
    className: string;
    onCategoryClick: (id: string) => void;
}

interface ICategoriesProps {
    id: string;
    title: string;
    created_at: Date;
}


export const Sidebar = ({ onCategoryClick, className }: ISidebarProps) => {
    const [categories, setCategories] = useState<ICategoriesProps[]>([]);

    const categoriesDataFetch = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch {
            toast.error('Ocorreu um erro ao carregar as categorias');
        }
    }

    const handleonDragEnd = (result: any) => {
        if (!result.destination) return;
        const items = Array.from(categories);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setCategories(items);
    }
    
    useEffect(() => {
        categoriesDataFetch();
    }, []);

    return (
        <div className={className}>
            <CreateNewCategory />
            <DragDropContext onDragEnd={handleonDragEnd}>
                <Droppable droppableId='categories'>
                    {(provided) => (
                        <div className='categories p-2 mt-4 space-y-2' {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                categories.map((category, index) => (
                                    <Draggable key={category.id} draggableId={category.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps} {...provided.dragHandleProps}
                                                onClick={() => onCategoryClick(category.id)}
                                                key={category.id}
                                                className='bg-white rounded-lg shadow-md h-[35px] cursor-pointer flex items-center pl-2'
                                            >
                                                <h1
                                                    className='font-semibold text-gray-500'
                                                >{category.title.toUpperCase()}</h1>
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )}
                 </Droppable>
            </DragDropContext>
        </div>
    )
}