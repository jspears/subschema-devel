import ValueManager from '../lib/index';
import {expect} from 'chai';

describe('ValueManager', function () {
    this.timeout(20000);
    describe('value handling', function () {
        it('should add a listener and fire on change', function (done) {
            var vm = new ValueManager();
            vm.addListener('stuff', function (newValue, oldValue, path) {
                expect(oldValue).to.not.exist;
                expect(newValue).to.eql(1);
                expect(path).to.eql('stuff');
                done();
            });
            vm.setValue({
                stuff: 1
            });

        });
        it('should add a listener and fire on change when it is nested',
            function (done) {
                var vm = new ValueManager();
                vm.addListener('stuff.more',
                    function (newValue, oldValue, path) {
                        expect(oldValue).to.not.exist;
                        expect(newValue).to.eql(false);
                        expect(path).to.eql('stuff.more');
                        done();

                    });
                vm.setValue({
                    stuff: {
                        more: false
                    }
                });

            });
        it('should add a listener and fire on change when it is nested and changes',
            function (done) {
                var vm    = new ValueManager();
                var first = true;
                vm.addListener('stuff.more',
                    function (newValue, oldValue, path) {
                        if (first) {
                            expect(oldValue).to.not.exist;
                            expect(newValue).to.eql(false);
                            expect(path).to.eql('stuff.more');
                            first = false;
                        } else {
                            expect(oldValue).to.eql(false);
                            expect(newValue).to.eql(true);
                            expect(path).to.eql('stuff.more');


                            done();
                        }

                    });
                vm.setValue({
                    stuff: {
                        more: false
                    }
                });
                vm.setValue({
                    stuff: {
                        more: true
                    }
                });
            });

        it('should add a listener and fire on change when it is nested and changes to null',
            function (done) {
                var vm    = new ValueManager();
                var first = true;
                vm.addListener('stuff.more',
                    function (newValue, oldValue, path) {
                        if (first) {
                            expect(oldValue).to.not.exist;
                            expect(newValue).to.eql(false);
                            expect(path).to.eql('stuff.more');
                            first = false;
                        } else {
                            expect(oldValue).to.eql(false);
                            expect(newValue).to.eql(null);
                            expect(path).to.eql('stuff.more');

                            done();
                        }

                    });
                vm.setValue({
                    stuff: {
                        more: false
                    }
                });
                vm.setValue({
                    stuff: null
                });
            });
        it('should add a listener and fire on change when it is nested and changes to all null',
            function (done) {
                var vm    = new ValueManager();
                var first = true;
                vm.addListener('stuff.more',
                    function (newValue, oldValue, path) {
                        if (first) {
                            expect(oldValue).to.not.exist;
                            expect(newValue).to.eql(false);
                            expect(path).to.eql('stuff.more');
                            first = false;
                        } else {
                            expect(oldValue).to.eql(false);
                            expect(newValue).to.eql(null);
                            expect(path).to.eql('stuff.more');

                            done();
                        }

                    });
                vm.setValue({
                    stuff: {
                        more: false
                    }
                });
                vm.setValue(null);
            });
        it('should add a listener and remove a listener', function (done) {
            var vm    = new ValueManager();
            var fired = 0;
            var added = vm.addListener('stuff.more',
                function (newValue, oldValue, path) {
                    fired++;
                });
            vm.setValue({
                stuff: {
                    more: false
                }
            });
            vm.removeListener(added);
            vm.addListener('stuff.more', function () {
                expect(fired).to.eql(1);
                done();
            });
            vm.setValue(null);
        });
        it('should add a listener and remove a listener by path',
            function (done) {
                var vm    = new ValueManager();
                var fired = 0;
                var added = vm.addListener('stuff.more',
                    function (newValue, oldValue, path) {
                        fired++;
                    });
                vm.setValue({
                    stuff: {
                        more: false
                    }
                });
                vm.removeListener('stuff.more');
                vm.addListener('stuff.more', function () {
                    expect(fired).to.eql(1);
                    done();
                });
                vm.setValue(null);
            });
        it('should update change when it is nested', function (done) {
            var vm    = new ValueManager(
                {
                    stuff: {
                        more: true
                    },
                    other: true
                }
            );
            var fired = false;
            vm.addListener('stuff.more', function (newValue, oldValue, path) {
                expect(oldValue).to.eql(true);
                expect(newValue).to.eql(false);
                expect(path).to.eql('stuff.more');
                done();
            });
            expect(vm.getValue().stuff.more).to.eql(true);
            vm.update('stuff.more', false);
            var val = vm.getValue();
            expect(val.stuff.more).to.eql(false);
            expect(val.other).to.eql(true);
        });
        it('should update change when it is nested and no value', function () {
            var vm    = new ValueManager(
                {

                    other: true
                }
            );
            var fired = false;
            vm.addListener('stuff.more', function (newValue, oldValue, path) {
                expect(oldValue).to.not.exist;
                expect(newValue).to.eql(false);
                expect(path).to.eql('stuff.more');
                fired = true;
            });
            vm.update('stuff.more', false);
            var val = vm.getValue();
            expect(val.stuff.more).to.eql(false);
            expect(val.other).to.eql(true);
            expect(fired).to.eql(true);
        });
        it('should create an array', function (done) {
            var vm = new ValueManager(
                {

                    other: true
                }
            );
            vm.addListener('stuff', function (newValue, oldValue, path) {
                expect(oldValue).to.not.exist;
                expect(newValue[0].more).to.eql(false);
                expect(path).to.eql('stuff.0.more');
                done();
            });
            vm.update('stuff.0.more', false);
            var val = vm.getValue();
            expect(val.stuff[0].more).to.eql(false);
            expect(val.other).to.eql(true);
        });
        it('should replace all the keys', function () {
            var vm = new ValueManager(
                {

                    other: true,
                    more : 'stuff'
                }
            );
            vm.setValue({ test: 1, other: false });
            var val = vm.getValue();
            expect(val.other).to.eql(false);
            expect(val.more).to.not.exist;
            expect(val.test).to.eql(1);
        });
    });
    describe('error handling', function () {

        it('should have errors', function () {
            var vm     = ValueManager({ other: true },
                { other: [{ message: 'Has Error' }] });
            var errors = vm.errorsFor('other');
            expect(errors.length).to.eql(1);
            expect(errors[0].message).to.eql('Has Error');

        });
        it('should have errors nested errors', function () {
            var vm     = ValueManager({ other: { more: 'stuff' } }, {
                other       : [{ message: 'Has Error' }],
                'other.more': [{ message: 'More' }]
            });
            var errors = vm.errorsFor('other');
            expect(errors.length).to.eql(2);
            expect(errors[0].message).to.eql('Has Error');
            expect(errors[1].message).to.eql('More');

        });
        it('should fire error listeners', function () {
            var vm     = ValueManager();
            var errors = [];
            vm.addErrorListener('other', function () {
                errors.push(Array.prototype.slice.call(arguments));
            });
            vm.updateErrors('other', [{ message: 'Has Error' }]);
            expect(errors.length).to.eql(1);

            vm.updateErrors('other.more', { message: 'Has More' });
            expect(errors.length).to.eql(2);

            var e = vm.getErrors();
            expect(e['other.more'].length).to.eql(1);
            expect(e['other'].length).to.eql(1);
            vm.updateErrors('other', null);
            var e = vm.getErrors();
            expect(e['other']).to.not.exist;

        });
    });
    describe('stash', function () {
        it('should stash stuff with names, keys and idx', function () {
            const vm  = ValueManager({
                hello: {
                    world: 'Joe'
                },
                bob  : ['uncle']
            })
            const idx = vm.stash('test1', ['hello']);

            vm.update('hello.world', 'Don');

            expect(vm.path('hello.world')).to.eql('Don');

            vm.unstash('test1', idx);
            expect(vm.path('hello.world')).to.eql('Joe');

        })

        it('should stash stuff with names, keys', function () {
            const vm = ValueManager({
                hello: {
                    world: 'Joe'
                },
                bob  : ['uncle']
            });
            vm.stash('test1', ['hello']);

            vm.update('hello.world', 'Don');

            vm.stash('test1', ['hello']);

            expect(vm.path('hello.world')).to.eql('Don');

            vm.unstash('test1');
            expect(vm.path('hello.world')).to.eql('Don');
            vm.unstash('test1');
            expect(vm.path('hello.world')).to.eql('Joe');


        });

        it('should stash stuff with name', function () {
            const vm = ValueManager({
                hello: {
                    world: 'Joe'
                },
                bob  : ['uncle']
            });
            vm.stash('test1');

            vm.update('hello.world', 'Don');

            vm.stash('test1');

            expect(vm.path('hello.world')).to.eql('Don');

            vm.unstash('test1');
            expect(vm.path('hello.world')).to.eql('Don');
            vm.unstash('test1');
            expect(vm.path('hello.world')).to.eql('Joe');


        })

        it('should stash stuff', function () {
            const vm = ValueManager({
                hello: {
                    world: 'Joe'
                },
                bob  : ['uncle']
            })
            vm.stash();

            vm.update('hello.world', 'Don');

            vm.stash();

            expect(vm.path('hello.world')).to.eql('Don');

            vm.unstash();
            expect(vm.path('hello.world')).to.eql('Don');
            vm.unstash();
            expect(vm.path('hello.world')).to.eql('Joe');


        })
    })
});
