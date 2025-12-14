class Subject():
    all_instances = []
    def __init__(self, name, difficulty):
        self.name = name
        self.difficulty = difficulty

        Subject.all_instances.append(self)
        print(f'Created {self.name}! Difficulty set to: {self.difficulty}.')

def plan(h, all_subs):
    a = 0
    for sub in all_subs:
        a+=sub.difficulty
    factor = a/h
    
    print(f'{'$'*15}Your Planner{'$'*15}\n')
    for sub in all_subs:
        hours = sub.difficulty/factor
        minutes = hours*60%60
        if minutes == 0:
            print(f'{'-'*50}\n{sub.name}: {hours:.0f} hours.')
        else:
            print(f'{'-'*50}\n{sub.name}: {hours:.0f} hours and {minutes*60%60:.1f} minutes\n')

def edit(list_obj, index, parameter, new_value):
    if 0 <=index < len(list_obj):
        target_object = list_obj[index]

        try:
            if parameter == 'difficulty':
                new_value = float(new_value)
            setattr(target_object, parameter, new_value)
            print(f'Success! The object with index {index}, had the parameter "{parameter}" changed to "{new_value}"!')
        except AttributeError:
            print(f'Error! The object does not have the parameter "{parameter}"...')
i = 0
while i != 4:
    print(f'{'#'*70}')
    i = int(input('Welcome to Student Difficulty Tracker! Press:\n1, to register a new subject;\n2, to edit a subject;\n3, to access your study plan to all subjects registered based on the time you have to study;\n4, to exit.\n'))
    if i == 1:
        print('You pressed 1! Loading subject inserter...')
        name = input('What is the name of the new subject? ')
        difficulty = float(input('What is your difficulty in this subject (0, 5): '))
        if difficulty>5:
            difficulty = 5
        if difficulty<0:
            difficulty = 0
        Subject(name, difficulty)
    elif i == 2:
        print('You pressed 2! Loading editor...')
        index = 0
        for sub in Subject.all_instances:
            print(index, vars(sub))
            index += 1
        index = int(input('What is the index of the subject you want to edit? '))
        parameter = input('Which is the parameter you want to edit? ').lower()
        value = input('What is the new value you would like it to be assigned to? ')
        print('Editing...')
        edit(Subject.all_instances, index, parameter, value)
        
    elif i == 3:
        print('You pressed 3! Loading planner maker...')
        hours = float(input('How many hours do you have to study today? '))
        plan(hours, Subject.all_instances)
print('You pressed 4! Exiting...')
print('Thank you for using our app!')

    